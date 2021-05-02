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
import { updateOrder } from "../common/api";
import { useRecoilState } from "recoil";
import { cartDataState, cartTotalPriceState } from "../common/recoil.js";
import { toast, sleep } from "../js/utils.js";

const OrderPage = () => {
  const [selected, setSelected] = useState("saved_address");
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );

  const onClickPayment = async () => {
    await updateOrder({
      receiver_name: itemData.price,
      receiver_phone: itemTotalPrice,
      zipcode: rentDate.startDate,
      address1: rentDate.endDate,
      address2: packageOption,
      total: cartTotalPrice,
      order_status: "prepaid",
    });

    // 🚩🚩🚩 모달창 추가하기(장바구니 바로가기 or 쇼핑 계속하기)
    toast("주문이 완료되었습니다");
  };

  return (
    <Page name="order">
      <Navbar title="주문 정보" noHairline sliding={false} backLink="Back" />
      <BlockTitle className="mx-7 my-4">주문상품 정보</BlockTitle>
      <Block>
        <p>🚩🚩🚩장바구니에서 구매확정 리스트를 전달받으세요</p>
      </Block>
      <BlockTitle className="mx-7 my-4">배송지 정보</BlockTitle>
      <Block className="mx-7 my-10">
        <List menuList>
          <ListItem
            link
            title="기존 배송지"
            selected={selected === "saved_address"}
            onClick={() => setSelected("saved_address")}
          >
            <Icon
              md="material:home"
              aurora="f7:house_fill"
              ios="f7:house_fill"
              slot="media"
            />
          </ListItem>
          <ListItem
            link
            title="신규입력"
            selected={selected === "new_address"}
            onClick={() => setSelected("new_address")}
          >
            <Icon
              md="material:person"
              aurora="f7:person_fill"
              ios="f7:person_fill"
              slot="media"
            />
          </ListItem>
        </List>
      </Block>
      <BlockTitle className="mx-7 my-4">고객 정보</BlockTitle>
      <Block className="mx-7 my-10">
        <List inlineLabels noHairlines>
          <ListInput name="배송지명" label="배송지명" type="text" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput name="수령인" label="수령인" type="text" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput name="배송지" label="배송지" type="text" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
          <ListInput name="연락처" label="연락처" type="tel" clearButton>
            <Icon icon="demo-list-icon" slot="media" />
          </ListInput>
        </List>
      </Block>

      <BlockTitle className="mx-7 my-4">결제 수단</BlockTitle>
      <Block className="mx-7 my-10">
        <List>
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
