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
            <Col width="66" className="flex flex-row w-auto mb-3">
              <Checkbox name="checkbox-1" defaultChecked />
              <p className="px-2">베이직</p>
              <Checkbox className="ml-1" name="checkbox-2" />
              <p className="px-2">프리미엄</p>
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
      </PageContent>
    </Page>
  );
};
export default ItemPage;
