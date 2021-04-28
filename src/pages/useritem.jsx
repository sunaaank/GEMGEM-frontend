import {
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React from "react";
import Nav from "../components/nav.jsx";

const UserItemPage = () => {
  return (
    <Page name="useritem">
      <Nav />
      <div className="p-3 flex flex-col items-center">
        <p>여기는 잼 위시리스트 페이지 입니다.</p>
      </div>
    </Page>
  );
};
export default UserItemPage;
