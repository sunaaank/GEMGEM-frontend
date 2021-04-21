import {
  Block,
  BlockTitle,
  Button,
  Col,
  Checkbox,
  Link,
  List,
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
} from "framework7-react";
import React from "react";
import Nav from "../components/nav.jsx";
import ItemGuide from "../components/itemguide.jsx";
import Review from "../components/review.jsx";

const ItemPage = () => {
  return (
    <Page name="item">
      <Nav />
      {/* Page content */}
      <PageContent className="p-0 m-0">
        <Swiper>
          <SwiperSlide>
            <img
              className="resize"
              alt="상품이미지"
              src="https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png"
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        <Block className="mx-7 my-10 flex flex-col items-start">
          <BlockTitle>잼1111111</BlockTitle>
          <p>100000원</p>
        </Block>
        <Block strong className="mx-7 my-10 ">
          <Row className="w-full mb-3">
            <Col width="33" className="mb-3">
              포장방식
            </Col>
            <Col width="66" className="flex flex-row w-full mb-3">
              <List className="p-0 m-0 w-full">
                <ListItem
                  radio
                  radioIcon="start"
                  title="베이직"
                  value="basic"
                  name="demo-radio-start"
                  defaultChecked
                ></ListItem>
                <ListItem
                  radio
                  radioIcon="start"
                  title="프리미엄"
                  value="premium"
                  name="demo-radio-start"
                ></ListItem>
              </List>
            </Col>
          </Row>
          <Row className="flex flex-row w-full mb-3 ">
            <Col width="33">수량</Col>
            <Col width="66" className="flex flex-start">
              <Stepper raised />
            </Col>
          </Row>
        </Block>
        <Block className="mx-3 my-8">
          <Row tag="p">
            <Col tag="span">
              <Button large raised>
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
          <p>🚩🚩🚩 상세이미지를 넣어주세요🚩🚩🚩</p>
        </Block>
        <ItemGuide />
        <Review />
      </PageContent>
    </Page>
  );
};
export default ItemPage;
