import {
  Block,
  BlockTitle,
  Button,
  Col,
  Checkbox,
  Icon,
  Link,
  List,
  ListItem,
  ListInput,
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
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Nav from "../components/nav.jsx";
import ItemGuide from "../components/itemguide.jsx";
import Review from "../components/review.jsx";
import { getItem } from "../common/api";

const ItemPage = (props) => {
  console.log("✨✨", props.f7route);
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    const fetchItem = getItem(props.f7route.params).then((res) => {
      setItemData(res.data);
    });
    fetchItem;
  }, []);
  console.log("🎁", itemData);
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
            <ListInput label="대여시작일" type="date">
              <Icon icon="demo-list-icon" slot="media" />
            </ListInput>
            <ListInput label="대여반납일" type="date">
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
                {/*  </ul>*/}
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
