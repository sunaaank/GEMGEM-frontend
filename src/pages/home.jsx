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
import IntroPage from "../pages/intro.jsx";

const HomePage = () => {
  return (
    <>
      <Nav />
      <Page name="home">
        <div className="page-content p-0 m-0">
          <IntroPage />
          <div className="block mt-10">
            <div className="flex flex-col items-center color-theme-black">
              <p>💎GEMGEM에 오신 것을 환영합니다💎</p>
              <p>여기는 메인 페이지 입니다.</p>
              <p>파이팅파이팅</p>
            </div>
          </div>
          <BlockTitle>✨GEMGEM'S PICK</BlockTitle>
          <List mediaList inset>
            <ListItem link="#" title="JAMJAMJAM" subtitle="yup">
              <img
                slot="media"
                src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg"
                width="44"
              />
            </ListItem>
            <ListItem link="#" title="JEMJEMJEM" subtitle="yop">
              <img
                slot="media"
                src="https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg"
                width="44"
              />
            </ListItem>
            <ListItem link="#" title="JEMS" subtitle="yep">
              <img
                slot="media"
                src="https://cdn.framework7.io/placeholder/fashion-88x88-6.jpg"
                width="44"
              />
            </ListItem>
          </List>
        </div>
      </Page>
    </>
  );
};
export default HomePage;
