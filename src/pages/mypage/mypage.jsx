import {
  BlockTitle,
  List,
  ListItem,
  Link,
  Navbar,
  NavTitle,
  NavRight,
  Page,
} from "framework7-react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { itemsDataState, orderDataState } from "../../common/recoil.js";
import { getToken } from "../../common/auth";
import ItemsSwiper from "../../components/itemsSwiper.jsx";
import AskLogin from "../../components/askLogin.jsx";

const MyPage = () => {
  const itemsData = useRecoilValue(itemsDataState);
  const orderData = useRecoilValue(orderDataState);

  let loggedIn = !!getToken().token;

  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  const orderedItems = orderData.line_items;

  return (
    <Page name="mypage">
      <Navbar noHairline sliding={false}>
        <NavTitle href="/">마이페이지</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
      </Navbar>
      <div className="px-3 flex flex-col items-center">
        {loggedIn ? (
          <div className="py-3 w-full">
            <BlockTitle className="mx-7 mt-6 mb-4 font-semibold text-lg">
              주문내역
            </BlockTitle>
            <List mediaList>
              <ListItem link="#" title={`주문번호:`} subtitle={`주문일자: `} />
            </List>
            <div className="my-4 w-full">
              <ItemsSwiper
                itemsData={itemsData}
                onClickItem={() => onClickItem()}
              />
            </div>
          </div>
        ) : (
          <AskLogin />
        )}
      </div>
    </Page>
  );
};
export default MyPage;
