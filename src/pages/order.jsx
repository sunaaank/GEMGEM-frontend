import {
  Block,
  BlockTitle,
  Button,
  Col,
  Checkbox,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  PageContent,
  Radio,
  f7,
  Swiper,
  SwiperSlide,
  Toolbar,
  Tabs,
  Tab,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
  Stepper,
  create,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  orderDataState,
} from "../common/recoil.js";
import { toast, sleep } from "../js/utils.js";
import { getOrder, updateOrder } from "../common/api";
import PostCode from "../components/postcode.jsx";

const OrderPage = () => {
  const [selected, setSelected] = useState("saved_address");
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [orderData, setOrderData] = useRecoilState(orderDataState);
  const [orderInput, setOrderInput] = useState({
    receiver_name: "",
    receiver_phone: "",
    address: "",
  });
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );

  console.log("인풋인풋", orderInput);
  useEffect(() => {
    const fetchOrder = async () => {
      let res = await getOrder();
      if (!!res.data) {
        setOrderData(res.data);
      }
    };

    fetchOrder();
    console.log("주문데이터내놔", orderData);
  }, [cartData]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInput({ ...orderInput, [name]: value });
  };

  const onClickPayment = async () => {
    let res = await updateOrder({
      receiver_name: orderInput.receiver_name,
      receiver_phone: orderInput.receiver_phone,
      zipcode: "123423",
      address1: orderInput.address,
      address2: "4층 인썸니아",
      total: cartTotalPrice,
      order_status: "prepaid",
    });
    if (!!res.data) {
      setOrderData(res.data);
      setCartData(res.data.line_items);
    }
    toast("주문이 완료되었습니다");
    await sleep(400);
    location.replace("/");
  };

  return (
    <Page name="order" noToolBar>
      <Navbar title="주문 정보" noHairline sliding={false} backLink="Back" />
      <BlockTitle className="mx-7 my-4 font-bold">주문상품 정보</BlockTitle>
      {cartData.length && (
        <Block>
          <List mediaList className="mx-4 mt-0">
            <ul className="ul flex flex-wrap">
              {cartData.map((lineitem, index) => (
                <ListItem
                  key={index}
                  title={lineitem.item.name}
                  subtitle={lineitem.total}
                  text={
                    <div className="flex flex-col">
                      <p>
                        {lineitem.rent_startdate}~{lineitem.rent_enddate}
                      </p>
                      <p>포장옵션: {lineitem.package_type}</p>
                    </div>
                  }
                  onClick={() => onClickItem(lineitem.item.id)}
                >
                  <img slot="media" width="90" src={lineitem.item.image_url} />
                </ListItem>
              ))}
            </ul>
          </List>
        </Block>
      )}
      <BlockTitle className="mx-7 my-4 font-bold">고객 정보</BlockTitle>
      <Block className="mx-7 ">
        <List inlineLabels noHairlines className=" mt-0">
          <ListInput
            name="name"
            label="주문자 성함"
            type="text"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          />

          <ListInput
            name="phone"
            label="연락처"
            type="tel"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          />
          <ListInput
            name="email"
            label="이메일"
            type="email"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          />
        </List>
      </Block>
      <BlockTitle className="mx-7 my-4 font-bold">배송지 정보</BlockTitle>
      <Block className="mx-2">
        <List inlineLabels noHairlines className=" mt-0">
          {/*<ListInput
            name="배송지명"
            label="배송지명"
            type="text"
            clearButton
             autoComplete={false}
            onChange={(e) => onInputChange(e)}
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>*/}
          <ListInput
            name="receiver_name"
            label="수령인"
            type="text"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            name="address"
            label="배송지"
            type="text"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput
            name="receiver_phone"
            label="연락처"
            type="tel"
            clearButton
            autoComplete={false}
            onChange={(e) => onInputChange(e)}
          >
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>
      </Block>

      <BlockTitle className="mx-7 my-4 font-bold">결제 수단</BlockTitle>
      <Block className="mx-7">
        <List className=" mt-0">
          <ListItem
            title="신용카드"
            selected={selected === "new_address"}
            onClick={() => setSelected("new_address")}
          ></ListItem>
          <ListItem
            title="휴대폰 결제"
            selected={selected === "new_address"}
            onClick={() => setSelected("new_address")}
          ></ListItem>
          <ListItem
            title="무통장입금"
            selected={selected === "new_address"}
            onClick={() => setSelected("new_address")}
          ></ListItem>
        </List>
        <Button
          large
          raised
          fill
          href="#"
          className="mb-10"
          onClick={() => onClickPayment()}
        >
          결제하기
        </Button>
      </Block>
    </Page>
  );
};
export default OrderPage;
