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
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  alreadyHasCartState,
  alreadyHasItemState,
} from "../common/recoil.js";
import Nav from "../components/nav.jsx";
import IntroPage from "../pages/intro.jsx";
import { getToken } from "../common/auth";
import { getCart } from "../common/api";

const HomePage = () => {
  let loggedIn = !!getToken().token;
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );
  const [alreadyHasCart, setAlreadyHasCart] = useRecoilState(
    alreadyHasCartState
  );
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );

  {
    loggedIn &&
      useEffect(() => {
        const fetchCart = async () => {
          let res = await getCart();
          if (!!res.data) {
            setCartData(res.data);
            console.log("🎁getCart", cartData);
          }
        };

        fetchCart();
      }, [alreadyHasItem]);

    useEffect(() => {
      const sumCartPrice = () => {
        let cartPrice = [0, 0];
        cartData && cartData.map((item) => cartPrice.push(item.total));
        const totalPrice = cartPrice.reduce((item1, item2) => item1 + item2);
        setCartTotalPrice(totalPrice);
      };

      sumCartPrice();
    }, [cartData]);
  }

  return (
    <>
      <Navbar title="GEMGEM" noHairline sliding={false} />
      <Page name="home">
        <div className="p-0 m-0">
          <img
            src={`https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png`}
          />

          <div className="my-10">
            <div className="flex flex-col items-center"></div>
          </div>
          <BlockTitle className="mx-3">✨GEMGEM'S CATEGORY</BlockTitle>
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
