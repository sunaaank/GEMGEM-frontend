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
  NavRight,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  alreadyHasCartState,
  alreadyHasItemState,
  userDataState,
  orderDataState,
  itemsDataState,
} from "../common/recoil.js";
import Nav from "../components/nav.jsx";
import IntroPage from "../pages/intro.jsx";
import { getToken } from "../common/auth";
import { getCart, getUser } from "../common/api";

const HomePage = () => {
  let loggedIn = !!getToken().token;
  const [userData, setUserData] = useRecoilState(userDataState);
  const itemsData = useRecoilValue(itemsDataState);
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );
  const [orderData, setOrderData] = useRecoilState(orderDataState);
  const [alreadyHasCart, setAlreadyHasCart] = useRecoilState(
    alreadyHasCartState
  );
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );

  {
    loggedIn &&
      // 유저 기본정보 받아오기

      useEffect(() => {
        const fetchCart = async () => {
          let res = await getCart();
          if (!!res.data) {
            setCartData(res.data);
          }
          console.log("🎁getCart", cartData);
        };

        fetchCart();
      }, [alreadyHasItem, cartTotalPrice]);

    useEffect(() => {
      const fetchUser = async () => {
        if (loggedIn) {
          let res = await getUser();
          if (!!res.data) {
            setUserData(res.data);
          }
          console.log("getUser", userData);
        }
      };

      fetchUser();
    }, [orderData]);

    useEffect(() => {
      const sumCartPrice = () => {
        let cartPrice = [0, 0];
        cartData && cartData.map((item) => cartPrice.push(item.total));
        const totalPrice = cartPrice.reduce((item1, item2) => item1 + item2);
        const addShippingTotalPrice =
          totalPrice >= 30000 ? totalPrice : totalPrice + 3000;
        setCartTotalPrice(addShippingTotalPrice);
      };

      sumCartPrice();
    }, [cartData]);
  }

  return (
    <>
      <Navbar noHairline sliding={false}>
        <NavTitle href="/">GEMGEM</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
      </Navbar>

      <Page name="home">
        {itemsData.length && (
          <div className="p-0 mt-2 mx-10">
            <Row className="flex flex-row flex-nowrap">
              <div className="flex w-66">
                <img src={itemsData[2].image_url} />
              </div>
              <div className="flex flex-col w-33">
                <img src={itemsData[5].image_url} width="355" />

                <img src={itemsData[4].image_url} width="355" />
              </div>
            </Row>
            <Row className="flex flex-row flex-nowrap">
              <div className="flex flex-col w-33">
                <img src={itemsData[4].image_url} width="355" />

                <img src={itemsData[5].image_url} width="355" />
              </div>
              <div className="flex w-66">
                <img src={itemsData[3].image_url} />
              </div>
            </Row>
            <Row className="flex flex-row flex-nowrap">
              <div className="flex w-50">
                <img src={itemsData[2].image_url} />
              </div>
              <div className="flex w-50">
                <img src={itemsData[5].image_url} />
              </div>
            </Row>
          </div>
        )}
      </Page>
    </>
  );
};
export default HomePage;
