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
          <div className="mx-4">
            <ul className="ul flex flex-row justify-center flex-wrap ">
              {itemsData.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col my-3 mx-3">
                    <img src={item.image_url} width="120" />
                    <p className="mt-2 text-center font-semibold">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <AskLogin />
      )}
    </Page>
  );
};
export default UserItemPage;
