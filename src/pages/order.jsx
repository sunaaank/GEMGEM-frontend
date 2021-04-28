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
import React, { useState } from "react";
import Nav from "../components/nav.jsx";

const OrderPage = () => {
  const [selected, setSelected] = useState("saved_address");
  return (
    <Page name="order">
      <Nav />

      <PageContent className="p-0 m-0">
        <BlockTitle className="mx-7 my-4">주문 정보</BlockTitle>
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

          <List inlineLabels noHairlinesMd>
            <ListInput label="배송지명" type="text" clearButton>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput label="수령인" type="text" clearButton>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>

            <ListInput label="배송지" type="text" clearButton>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>

            <ListInput label="연락처1" type="tel" clearButton>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput label="연락처2" type="tel" clearButton>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput label="선물메세지" type="textarea" resizable>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
          </List>
        </Block>
        <BlockTitle className="mx-7 my-4">주문상품 정보</BlockTitle>
        <Block>
          <p>🚩🚩🚩장바구니에서 구매확정 리스트를 전달받으세요</p>
        </Block>
      </PageContent>
    </Page>
  );
};
export default OrderPage;
