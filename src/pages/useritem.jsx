import {
  Block,
  BlockTitle,
  Button,
  Col,
  Card,
  CardContent,
  CardHeader,
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
import { useRecoilState } from "recoil";
import { itemsDataState } from "../common/recoil.js";
import { getToken } from "../common/auth";
import AskLogin from "../components/asklogin.jsx";

const UserItemPage = () => {
  const [itemsData, setItemsData] = useRecoilState(itemsDataState);
  let loggedIn = !!getToken().token;
  return (
    <Page name="useritem">
      <Navbar title="위시리스트" className="no-hairline" />

      {loggedIn ? (
        <div className="p-3 m-0">
          <List className="m-0">
            <ul className="ul flex flex-row flex-wrap ">
              {itemsData.map((item, index) => (
                <ListItem>
                  <div className="flex flex-col ">
                    <img src={item.image_url} width="130" />
                    <p className="text-center">{item.name}</p>
                  </div>
                </ListItem>
              ))}
            </ul>
          </List>
        </div>
      ) : (
        <AskLogin />
      )}
    </Page>
  );
};
export default UserItemPage;
