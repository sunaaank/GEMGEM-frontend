import { BlockTitle, Page, f7 } from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartDataState, alreadyHasItemState } from "../../common/recoil.js";
import Nav from "../../components/nav.jsx";
import Cart from "../lineitems/components/cart.jsx";
import NoCart from "../lineitems/components/nocart.jsx";
import AskLogin from "../../components/asklogin.jsx";
import { getToken } from "../../common/auth";
import { getCart } from "../../common/api";
import { deleteCart } from "../../common/api";
import { date } from "yup";

const CartPage = () => {
  let loggedIn = !!getToken().token;
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [selectedCartData, setSelectedCartData] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState();
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );

  // const sumCartPrice = () => {
  //   const cartPrice = [];
  //   cartData.map((item) => cartPrice.push(item.total));
  //   const totalPrice = cartPrice.reduce((item1, item2) => item1 + item2);
  //   setCartTotalPrice(totalPrice);
  // };

  {
    loggedIn &&
      useEffect(() => {
        const fetchCart = async () => {
          let res = await getCart();
          if (!!res.data) {
            setCartData(res.data);
          }
        };

        fetchCart();
        initialCart();
        // sumCartPrice();
      }, [alreadyHasItem]);

    console.log("🎁cart", cartData);
  }

  const initialCart = () => {
    const cartItem = [];
    for (let i = 0; i < cartData.length; i++) {
      cartItem.push(`Product${i + 1}`);
    }
    setSelectedCartData(cartItem);
  };

  const onClickDeleteCart = (e) => {
    console.log("item_id를 잡아봅시다", e.target.getAttribute("value"));
    const updateCart = async () => {
      let res = await deleteCart({
        item_id: e.target.getAttribute("value"),
      });
      if (!!res.data) {
        setCartData(res.data);
        f7.dialog.alert("상품이 삭제되었습니다");
      }
    };

    updateCart();
    initialCart();
    // sumCartPrice();
    console.log("🎁cart", cartData);
  };

  const onClickOrder = () => {
    console.log("주문하기 버튼 클릭");
  };

  return (
    <Page name="cart">
      <Nav />
      <a href="/order">주문 페이지 미리보기</a>
      <div className="p-3 flex flex-col items-center">
        <BlockTitle>장바구니</BlockTitle>
        {loggedIn ? (
          <div>
            <Cart
              cartData={cartData}
              onClickDeleteCart={onClickDeleteCart}
              onClickOrder={onClickOrder}
            />
            <NoCart />
          </div>
        ) : (
          <AskLogin />
        )}
      </div>
    </Page>
  );
};
export default CartPage;
