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
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
  Stepper,
  create,
} from "framework7-react";
import React from "react";
import Nav from "../components/nav.jsx";

const OrderPage = () => {
  return (
    <Page name="order">
      <Nav />
      <PageContent className="p-0 m-0">
        <BlockTitle className="mx-7 my-4">주문 정보</BlockTitle>
        <Block className="flex justify-center mx-7 my-10">
          <Row className="w-full mb-3">
            <Col width="33" className="mb-3">
              포장방식
            </Col>
            <Col width="66" className="flex flex-row w-full mb-3">
              <List className="p-0 m-0 w-full">
                <ul className="row">
                  <ListItem
                    className="col"
                    radio
                    radioIcon="start"
                    title="베이직"
                    value="basic"
                    name="demo-radio-start"
                    defaultChecked
                  ></ListItem>
                  <ListItem
                    className="col"
                    radio
                    radioIcon="start"
                    title="프리미엄"
                    value="premium"
                    name="demo-radio-start"
                  ></ListItem>
                </ul>
              </List>
            </Col>
          </Row>
        </Block>
        <Block className="flex justify-center mx-7 my-10">
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

            <div class="block-title">Picker with single value</div>
            <div class="list no-hairlines-md">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <input
                          type="text"
                          placeholder="Your iOS device"
                          readonly="readonly"
                          id="demo-picker-device"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <ListInput label="선물메세지" type="textarea" resizable>
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
          </List>
        </Block>
      </PageContent>
    </Page>
  );
};
export default OrderPage;
