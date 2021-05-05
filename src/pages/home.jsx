import { Link, Navbar, NavRight, NavTitle, Page, Row } from "framework7-react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  alreadyHasItemState,
  userDataState,
  orderDataState,
  itemsDataState,
} from "../common/recoil.js";
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
  const orderData = useRecoilValue(orderDataState);
  const alreadyHasItem = useRecoilValue(alreadyHasItemState);

  {
    loggedIn &&
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
        }
      };

      fetchUser();
    }, []);

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
        <div className="p-0 mt-2 mx-10">
          <Row className="flex flex-row flex-nowrap">
            <div className="flex w-66">
              <img
                alt="상품2번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660696-5e180400-a377-11eb-8ecd-d849e252f377.png"
              />
            </div>
            <div className="flex flex-col w-33">
              <img
                alt="상품5번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660691-5d7f6d80-a377-11eb-94b6-2f1f61beff2d.png"
                width="355"
              />
              <img
                alt="상품4번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660693-5d7f6d80-a377-11eb-8daf-27f5361c8fa8.png"
                width="355"
              />
            </div>
          </Row>
          <Row className="flex flex-row flex-nowrap">
            <div className="flex flex-col w-33">
              <img
                alt="상품4번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660693-5d7f6d80-a377-11eb-8daf-27f5361c8fa8.png"
                width="355"
              />

              <img
                alt="상품5번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660691-5d7f6d80-a377-11eb-94b6-2f1f61beff2d.png"
                width="355"
              />
            </div>
            <div className="flex w-66">
              <img
                alt="상품3번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660695-5e180400-a377-11eb-9754-77847d4cc184.png"
              />
            </div>
          </Row>
          <Row className="flex flex-row flex-nowrap">
            <div className="flex w-50">
              <img
                alt="상품2번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660696-5e180400-a377-11eb-8ecd-d849e252f377.png"
              />
            </div>
            <div className="flex w-50">
              <img
                alt="상품5번이미지"
                src="https://user-images.githubusercontent.com/46774456/115660691-5d7f6d80-a377-11eb-94b6-2f1f61beff2d.png"
              />
            </div>
          </Row>
        </div>
      </Page>
    </>
  );
};
export default HomePage;
