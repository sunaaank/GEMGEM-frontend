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
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  packageOptionState,
  rentDateState,
  itemTotalPriceState,
} from "../../common/recoil.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
import "moment/locale/ko";
import Nav from "../../components/nav.jsx";
import ItemGuide from "./components/itemguide.jsx";
import Review from "../../components/review.jsx";
import { getItem } from "../../common/api";
import { createCart } from "../../common/api";
import { getToken } from "../../common/auth";

const ItemPage = (props) => {
  let loggedIn = !!getToken().token;
  const [itemData, setItemData] = useState([]);
  const [packageOption, setPackageOption] = useRecoilState(packageOptionState);
  const [itemTotalPrice, setItemTotalPrice] = useRecoilState(
    itemTotalPriceState
  );
  const [rentDate, setRentDate] = useRecoilState(rentDateState);
  const [alreadyHasCart, setAlreadyHasCart] = useState(false);
  const [alreadyHasItem, setAlreadyHasItem] = useState(false);

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
  }, []);

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
  const getRentPeriod = () => {
    const b = moment(rentDate.startDate);
    const a = moment(rentDate.endDate);
    var days = a.diff(b, "days");
    if (!days || days <= 0) {
      return "0";
    } else {
      return days;
    }
  };

  //  ✅ 총 금액 계산하기
  const getTotalPrice = () => {
    const periodPrice =
      getRentPeriod() !== "0"
        ? itemData.price * getRentPeriod()
        : itemData.price;
    const packagePrice = packageOption === "프리미엄" ? 3000 : 0;
    const totalPrice = packagePrice + periodPrice;
    setItemTotalPrice(totalPrice);
    return totalPrice;
  };

  //  ✅ 장바구니 버튼 클릭 시 로그인 상태 체크하기
  //  🚩🚩🚩 로그인/회원가입 버튼 있는 모달 띠우기 "/users/sign_in",  "/users/sign_up"
  const goToCart = () => {
    {
      loggedIn ? submitItemData() : f7.dialog.alert("로그인을 해주세요");
    }
  };

  //  ✅ 장바구니 버튼 클릭 시 데이터 보내기
  const submitItemData = async () => {
    if (alreadyHasItem) {
      return f7.dialog.alert("이미 상품이 장바구니에 담겨있습니다");
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
      f7.dialog.alert("장바구니에 상품이 담겼습니다");
      setAlreadyHasItem(true);
      setRentDate({ startDate: "", endDate: "" });
    }
  };

  return (
    <Page name="item">
      <Nav />
      {/* Page content */}
      <PageContent className="p-0 m-0">
        <Swiper>
          {/* {itemData.map((item, index) => (
            <SwiperSlide>
              <img className="resize" alt="상품이미지" src={item.image_url} />
            </SwiperSlide>
          ))}*/}
          <SwiperSlide>
            <img className="resize" alt="상품이미지" src={itemData.image_url} />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        <BlockTitle className="flex justify-center items-center my-4 font-semibold text-3xl">
          {itemData.name}
        </BlockTitle>
        <Block className="mx-7 my-10">
          <List>
            <ListItem className="border-red-500 border-solid border-2 rounded-xl">
              {itemData.gem_install_code}
              <CopyToClipboard
                className="h-10 w-10"
                text={itemData.gem_install_code}
              >
                <button className="w-auto">
                  <Icon f7="doc_text" color="red" />
                </button>
              </CopyToClipboard>
            </ListItem>
            <ListItem>
              <Link href={itemData.github_url}>
                <Icon f7="logo_github" className="mr-2" />
                <p>{itemData.name}</p>
              </Link>
            </ListItem>
            <ListItem>{itemData.price}</ListItem>
          </List>
        </Block>
        <Block strong className="mx-7 my-10 ">
          <List>
            <ListInput
              label="대여시작일"
              name="startDate"
              type="date"
              value={rentDate.startDate}
              onChange={(e) => onRentDateChange(e)}
            >
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput
              label="대여반납일"
              name="endDate"
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
              <p>{getRentPeriod()}일</p>
            </Col>
          </Row>
          <Row className="flex flex-row w-full mb-3 ">
            <Col width="33">총액</Col>
            <Col width="66" className="flex flex-start">
              <p>{getTotalPrice()}원</p>
            </Col>
          </Row>
        </Block>
        <Block className="mx-3 my-8">
          <Row tag="p">
            <Col tag="span">
              <Button large raised onClick={() => goToCart()}>
                장바구니
              </Button>
            </Col>
            <Col tag="span">
              <Button large raised fill>
                바로구매
              </Button>
            </Col>
          </Row>
        </Block>
        <BlockTitle className="mx-7 my-4">상품 상세정보</BlockTitle>
        <Block className="flex justify-center mx-7 my-10">
          <List>
            <ListItem>{itemData.description}</ListItem>
            <ListItem>{itemData.gem_created_at}</ListItem>
            <ListItem>{itemData.gem_updated_at}</ListItem>
            <ListItem>{itemData.gem_version}</ListItem>
            <ListItem>{itemData.github_star}</ListItem>
            <ListItem>{itemData.github_url}</ListItem>
          </List>
        </Block>
        <ItemGuide />
        <Review />
      </PageContent>
    </Page>
  );
};
export default ItemPage;
