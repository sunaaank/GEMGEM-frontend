import {
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  Swiper,
  SwiperSlide,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React from "react";
import Nav from "../components/nav.jsx";
import ItemList from "../components/itemlist.jsx";

const ItemsPage = () => {
  return (
    <Page name="items">
      <Nav />
      <div className="page-content">
        <p className="flex justify-center">여기는 잼리스트 페이지 입니다.</p>
        <Link href="/item">잼 상세 페이지 미리보기</Link>
        <ItemList />
        <ItemList />
        <List>
          {[1, 2, 3].map((n) => (
            <ListItem key={n} title={`Item ${n}`} />
          ))}
        </List>
      </div>
    </Page>
  );
};
export default ItemsPage;
