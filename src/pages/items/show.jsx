import {
  Block,
  BlockTitle,
  Col,
  f7,
  Icon,
  Link,
  List,
  ListItem,
  ListInput,
  Swiper,
  SwiperSlide,
  Page,
  Navbar,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  packageOptionState,
  rentDateState,
  rentPeriodState,
  itemTotalPriceState,
  alreadyHasItemState,
  cartDataState,
} from "../../common/recoil.js";
import ItemGuide from "./components/itemguide.jsx";
import Review from "../../components/review.jsx";
import moment from "moment";
import "moment/locale/ko";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getItem, createCart } from "../../common/api";
import { getToken } from "../../common/auth";
import { toast } from "../../js/utils.js";

const ItemPage = (props) => {
  let loggedIn = !!getToken().token;
  const [itemData, setItemData] = useState([]);
  const [packageOption, setPackageOption] = useRecoilState(packageOptionState);
  const [itemTotalPrice, setItemTotalPrice] = useRecoilState(
    itemTotalPriceState
  );
  const [rentDate, setRentDate] = useRecoilState(rentDateState);
  const [rentPeriod, setRentPeriod] = useRecoilState(rentPeriodState);
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );
  const cartData = useRecoilValue(cartDataState);

  useEffect(() => {
    const fetchItem = async () => {
      let res = await getItem(props.f7route.params.id);
      if (!!res) {
        setItemData(res.data.result);

        setAlreadyHasItem(res.data.hasThisItem);
      }
    };

    fetchItem();
  }, [alreadyHasItem, cartData]);

  const onPackageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPackageOption(value);
    } else {
      setPackageOption("베이직");
    }
  };

  const onRentDateChange = (e) => {
    const { name, value } = e.target;
    setRentDate({ ...rentDate, [name]: value });
  };

  //  ✅ 대여기간 계산하기
  useEffect(() => {
    const getRentPeriod = () => {
      const startDay = moment(rentDate.startDate);
      const endDay = moment(rentDate.endDate);
      var days = endDay.diff(startDay, "days");
      if (!days || days <= 0) {
        setRentPeriod("0");
        return "0";
      } else {
        setRentPeriod(days);
        return days;
      }
    };
    getRentPeriod();
  }, [rentDate]);

  //  ✅ 총 금액 계산하기
  useEffect(() => {
    const getTotalPrice = () => {
      const periodPrice =
        rentPeriod !== "0" ? itemData.price * rentPeriod : itemData.price;
      const packagePrice = packageOption === "프리미엄" ? 3000 : 0;
      const totalPrice = packagePrice + periodPrice;
      setItemTotalPrice(totalPrice);
      return totalPrice;
    };
    getTotalPrice();
  }, [rentPeriod, packageOption]);

  //  ✅ 장바구니 버튼 클릭 시 데이터 보내기
  const onClickAddCart = async () => {
    if (!loggedIn) {
      f7.dialog.confirm("로그인하시겠습니까?", function () {
        props.f7router.navigate("/users/sign_in");
      });
    } else if (alreadyHasItem) {
      return toast("해당 상품은 <br/> 장바구니에 담겨있습니다");
    } else if (!rentDate.startDate || !rentDate.endDate) {
      return toast("대여기간을 선택해주세요");
    } else {
      await createCart({
        item_id: props.f7route.params.id,
        unit_price: itemData.price,
        total: itemTotalPrice,
        rent_startdate: rentDate.startDate,
        rent_enddate: rentDate.endDate,
        package_type: packageOption,
      });

      f7.dialog.confirm(
        "장바구니를 확인하시겠습니까?",
        "장바구니에 상품이 담겼습니다",
        function () {
          document.getElementById("tab-cart").click();
        }
      );
      setAlreadyHasItem(true);
      setRentDate({ startDate: "", endDate: "" });
    }
  };

  const ITEM_DETAILS = [
    { id: 1, name: "📆 FIRST RELEASE", content: `${itemData.gem_created_at}` },
    { id: 2, name: "📅 LATEST RELEASE", content: `${itemData.gem_updated_at}` },
    { id: 3, name: "⭐ STARS", content: `${itemData.github_star}` },
    { id: 4, name: "🎢 VERSION", content: `${itemData.gem_version}` },
  ];

  return (
    <Page name="item">
      <Navbar title={itemData.name} className="no-hairline" backLink="Back" />
      <div
        className="fab fab-extended fab-center-bottom bottom-0 fixed color-red w-full"
        onClick={() => onClickAddCart()}
      >
        <a href="#">
          <div className="fab-text text-lg">구매하기</div>
        </a>
      </div>

      <Block>
        <Swiper>
          <SwiperSlide>
            <img
              className="resize"
              alt={itemData.name}
              src={itemData.image_url}
            />
          </SwiperSlide>
        </Swiper>
        <div className="flex flex-col justify-center items-center">
          <BlockTitle className="mt-6 font-semibold text-3xl">
            {itemData.name}
          </BlockTitle>
        </div>

        <Block className="mx-7 my-4">
          <div className="flex flex-row flex-nowrap justify-around items-center mx-20">
            <Link href={itemData.github_url} target="_blank" external={true}>
              <Icon f7="logo_github" className="mr-2" />
            </Link>
            <CopyToClipboard
              className="h-10 w-10 outline-none focus:outline-none"
              text={itemData.gem_install_code}
            >
              <button
                className="w-auto outline-none focus:outline-none"
                onClick={() => toast("잼 설치 코드가 <br/> 복사되었습니다")}
              >
                <Icon f7="doc_text" color="red" />
              </button>
            </CopyToClipboard>
          </div>
        </Block>
        <Block strong className="mx-8 mt-10 mb-4">
          <List className="p-0">
            <ListInput
              label="대여시작일"
              name="startDate"
              min={moment().format("YYYY-MM-DD")}
              type="date"
              value={rentDate.startDate}
              onChange={(e) => onRentDateChange(e)}
            >
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput
              label="대여반납일"
              name="endDate"
              min={rentDate.startDate}
              type="date"
              value={rentDate.endDate}
              onChange={(e) => onRentDateChange(e)}
            >
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>

            <Row className="mb-3 ml-8 mt-4">
              <Col width="33" className="mb-3">
                포장방식
              </Col>
              <Col width="66" className="flex flex-row justify-end w-full mb-3">
                <List className="p-0 m-0 w-auto">
                  {PACKAGE_OPTIONS.map((option) => (
                    <ListItem
                      key={option.id}
                      className="col pr-10"
                      radio
                      radioIcon="start"
                      title={option.package_type}
                      value={option.package_type}
                      name="demo-radio-start"
                      defaultChecked={option.package_type === "베이직" && true}
                      onChange={(e) => onPackageChange(e)}
                    ></ListItem>
                  ))}
                </List>
              </Col>
            </Row>
          </List>
          <div className="flex flex-col font-medium text-lg">
            <Row className="flex flex-row mb-2 w-full text-right">
              <Col width="60">
                <p>대여기간</p>
              </Col>
              <Col width="40">
                <p>{rentPeriod}일</p>
              </Col>
            </Row>
            <Row className="flex flex-row w-full text-right">
              <Col width="60">
                <p>총 상품 금액</p>
              </Col>
              <Col width="40">
                <p className="font-bold text-2xl text-red-500">
                  {itemTotalPrice
                    ? Number(itemTotalPrice).toLocaleString()
                    : Number(itemData.price).toLocaleString()}
                  원
                </p>
              </Col>
            </Row>
          </div>
        </Block>

        <BlockTitle className="mx-7 mt-6 mb-4 font-semibold text-lg">
          상품 상세정보
        </BlockTitle>
        <Block className="flex flex-col mx-10">
          {ITEM_DETAILS.map((detail) => (
            <Row key={detail.id} className="flex flex-row mb-2 w-full">
              <Col width="45">
                <p>{detail.name}</p>
              </Col>
              <Col width="55">
                <p>{detail.content}</p>
              </Col>
            </Row>
          ))}

          <Row className="flex pt-4 mb-2 w-full">
            <Col>
              <p>👀 DESCRIPTION</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{itemData.description}</p>
            </Col>
          </Row>
        </Block>
        <ItemGuide />
        <Review name={itemData.name} image_url={itemData.image_url} />
      </Block>
    </Page>
  );
};
export default ItemPage;

const PACKAGE_OPTIONS = [
  { id: 1, package_type: "베이직" },
  { id: 2, package_type: "프리미엄" },
];
