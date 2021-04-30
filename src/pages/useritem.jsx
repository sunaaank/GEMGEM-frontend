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
import { getToken } from "../common/auth";

const UserItemPage = () => {
  let loggedIn = !!getToken().token;
  return (
    <Page name="useritem">
      <Nav />
      <div className="p-3 flex flex-col items-center">
        <BlockTitle>위시리스트</BlockTitle>
        {loggedIn ? (
          <List>
            <ul className="ul">
              <div className="flex flex-col">
                {/* </div>{listItemData.map((item, index) => (
                <ListItem
                checkbox
                name="demo-checkbox"
                value={`Product${index}`}
                checked={products.indexOf(`Product${index}`) >= 0}
                onChange={(e) => onProductChange(e)}
              >
              <img className="resize" alt="상품이미지" src={item.image_url} />}*/}

                <ListItem checkbox name="demo-checkbox" value="Product1">
                  <div>
                    <Link href="#">
                      <div>
                        <h2>상품이름1</h2>
                        <p>상품가격</p>
                        <p>상품 대여기간</p>
                        <p>상품옵션명</p>
                        <h4>상품 총 가격</h4>
                      </div>

                      <img
                        slot="media"
                        src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
                        width="80"
                      />
                    </Link>
                  </div>
                </ListItem>
              </div>
            </ul>
          </List>
        ) : (
          <List>
            <ListItem
              title="회원가입"
              link="/users/sign_up"
              icon="las la-question"
              panelClose
            />

            <ListItem
              title="로그인"
              link="/users/sign_in"
              icon="las la-question"
              panelClose
            />
          </List>
        )}
      </div>
    </Page>
  );
};
export default UserItemPage;
