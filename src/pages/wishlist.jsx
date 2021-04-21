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

const WishlistPage = () => {
  return (
    <Page name="wishlist">
      <Nav />
      {/* Top Navbar 
      <Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      <div className="bg-white">
      </div>*/}

      {/* Page content */}
      <div className="p-3 flex flex-col items-center">
        <p>여기는 잼 위시리스트 페이지 입니다.</p>
      </div>
    </Page>
  );
};
export default WishlistPage;
