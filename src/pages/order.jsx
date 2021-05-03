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
import ItemList from "../components/itemlist.jsx";

const OrderPage = () => {
  const [selected, setSelected] = useState("saved_address");
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [orderData, setOrderData] = useRecoilState(orderDataState);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );

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

  const onClickPayment = async () => {
    let res = await updateOrder({
      receiver_name: "test",
      receiver_phone: "010-1234-1234",
      zipcode: "123423",
      address1: "서울시 성동구 성수일로19길",
      address2: "4층 인썸니아",
      total: cartTotalPrice,
      order_status: "prepaid",
    });
    if (!!res.data) {
      setOrderData(res.data);
      setCartData(res.data.line_items);
    }
    toast("주문이 완료되었습니다");
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
      <BlockTitle className="mx-7 my-4 font-bold">배송지 정보</BlockTitle>
      <Block className="mx-7 ">
        <List menuList className=" mt-0">
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
      <BlockTitle className="mx-7 my-4 font-bold">고객 정보</BlockTitle>
      <Block className="mx-2">
        <List inlineLabels noHairlines className=" mt-0">
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
