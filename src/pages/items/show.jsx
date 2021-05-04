import {
  Block,
  BlockTitle,
  Button,
  Col,
  f7,
  Icon,
  Link,
  List,
  ListItem,
  ListInput,
  PageContent,
  Swiper,
  SwiperSlide,
  Page,
  Navbar,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  packageOptionState,
  rentDateState,
  rentPeriodState,
  itemTotalPriceState,
  alreadyHasCartState,
  alreadyHasItemState,
  cartDataState,
} from "../../common/recoil.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
import "moment/locale/ko";
import ItemGuide from "./components/itemguide.jsx";
import Review from "../../components/review.jsx";
import { getItem } from "../../common/api";
import { createCart } from "../../common/api";
import { getToken } from "../../common/auth";
import { toast, sleep } from "../../js/utils.js";

const ItemPage = (props) => {
  let loggedIn = !!getToken().token;
  const [itemData, setItemData] = useState([]);
  const [packageOption, setPackageOption] = useRecoilState(packageOptionState);
  const [itemTotalPrice, setItemTotalPrice] = useRecoilState(
    itemTotalPriceState
  );
  const [rentDate, setRentDate] = useRecoilState(rentDateState);
  const [rentPeriod, setRentPeriod] = useRecoilState(rentPeriodState);
  const [alreadyHasCart, setAlreadyHasCart] = useRecoilState(
    alreadyHasCartState
  );
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );
  const [cartData, setCartData] = useRecoilState(cartDataState);

  console.log("🎄패키지옵션", packageOption);
  console.log("🎄대여기간", rentDate);

  useEffect(() => {
    const fetchItem = async () => {
      let res = await getItem(props.f7route.params.id);
      if (!!res) {
        setItemData(res.data.result);
        setAlreadyHasCart(res.data.hasCart);
        setAlreadyHasItem(res.data.hasThisItem);
      }
    };

    fetchItem();
  }, [alreadyHasItem, cartData]);

  console.log("🎁개별 아이템데이터", itemData);
  console.log("🚛user has cart?", alreadyHasCart);
  console.log("🗽user has this item?", alreadyHasItem);

  const onPackageChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
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
  // 🚩🚩🚩변수명 바꾸기
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
        location.replace("/users/sign_in");
      });
      // toast("로그인 후 이용해주세요");
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

      // 🚩🚩🚩 모달창 추가하기(장바구니 바로가기 or 쇼핑 계속하기)
      f7.dialog.confirm(
        "장바구니를 확인하시겠습니까?",
        "장바구니에 상품이 담겼습니다",
        function () {
          document.getElementById("tab-cart").click();
        }
      );
      // toast("장바구니에 상품이 담겼습니다");
      setAlreadyHasItem(true);
      setRentDate({ startDate: "", endDate: "" });
    }
  };

  return (
    <Page name="item">
      <Navbar title={itemData.name} className="no-hairline" backLink="Back" />

      <PageContent className="p-0 m-0">
        <Swiper>
          <SwiperSlide>
            <img className="resize" alt="상품이미지" src={itemData.image_url} />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        <BlockTitle className="flex justify-center items-center my-4 font-semibold text-3xl">
          {itemData.name}
        </BlockTitle>

        <Block className="mx-7 my-6">
          <List>
            <ListItem>
              <Link href={itemData.github_url}>
                <Icon f7="logo_github" className="mr-2" />
              </Link>
              <CopyToClipboard
                className="h-10 w-10 outline-none focus:outline-none"
                text={itemData.gem_install_code}
              >
                <button
                  className="w-auto outline-none focus:outline-none"
                  onClick={() => toast("잼 설치 코드 <br/> 클립보드 저장완료")}
                >
                  <Icon f7="doc_text" color="red" />
                </button>
              </CopyToClipboard>
              <i className="f7-icons" value={itemData.id}>
                heart
              </i>
            </ListItem>

            <ListItem>{itemData.price}</ListItem>
          </List>
        </Block>
        <Block strong className="mx-7 my-10 ">
          <List>
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
          </List>
          <Row className="w-full mb-3">
            <Col width="33" className="mb-3">
              포장방식
            </Col>
            <Col width="66" className="flex flex-row w-full mb-3">
              <List className="p-0 m-0 w-full">
                {/*<ul className="row">*/}
                <ListItem
                  className="col"
                  radio
                  radioIcon="start"
                  title="베이직"
                  value="베이직"
                  name="demo-radio-start"
                  defaultChecked
                  onChange={(e) => onPackageChange(e)}
                ></ListItem>
                <ListItem
                  className="col"
                  radio
                  radioIcon="start"
                  title="프리미엄"
                  value="프리미엄"
                  name="demo-radio-start"
                  onChange={(e) => onPackageChange(e)}
                ></ListItem>
                {/*  </ul>*/}
              </List>
            </Col>
          </Row>
          <Row className="flex flex-row w-full mb-3 ">
            <Col width="33">대여기간</Col>
            <Col width="66" className="flex flex-start">
              <p>{rentPeriod}일</p>
            </Col>
          </Row>
          <Row className="flex flex-row w-full mb-3 ">
            <Col width="33">총액</Col>
            <Col width="66" className="flex flex-start">
              <p>{itemTotalPrice}원</p>
            </Col>
          </Row>
        </Block>
        <Block className="mx-3 my-8">
          <Button
            large
            fill
            raised
            onClick={() => onClickAddCart()}
            disabled={itemTotalPrice === "0" || (rentPeriod === "0" && true)}
          >
            장바구니
          </Button>
        </Block>
        <BlockTitle className="mx-7 my-4">상품 상세정보</BlockTitle>
        <Block className="flex justify-center mx-7 my-10">
          <List>
            <ListItem>{itemData.description}</ListItem>
            <ListItem>{itemData.gem_created_at}</ListItem>
            <ListItem>{itemData.gem_updated_at}</ListItem>
            <ListItem>{itemData.gem_version}</ListItem>
            <ListItem>{itemData.github_star}</ListItem>
          </List>
        </Block>
        <ItemGuide />
        <Review />
      </PageContent>
    </Page>
  );
};
export default ItemPage;
