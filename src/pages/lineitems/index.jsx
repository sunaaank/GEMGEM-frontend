import {
  BlockTitle,
  Page,
  f7,
  Navbar,
  NavTitle,
  NavRight,
  Link,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  alreadyHasCartState,
  alreadyHasItemState,
  orderDataState,
} from "../../common/recoil.js";
import Cart from "../lineitems/components/cart.jsx";
import NoCart from "../lineitems/components/nocart.jsx";
import AskLogin from "../../components/asklogin.jsx";
import { getToken } from "../../common/auth";
import { deleteCart, updateOrder, getOrder } from "../../common/api";
import { toast, sleep } from "../../js/utils.js";
import { date } from "yup";

const CartPage = () => {
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
  const [orderData, setOrderData] = useRecoilState(orderDataState);

  const onClickDeleteCart = (e) => {
    const deleteCartItem = async () => {
      let res = await deleteCart({
        item_id: e.target.getAttribute("value"),
      });
      if (!!res.data) {
        setCartData(res.data);
        toast("상품이 삭제되었습니다");
      }
    };

    deleteCartItem();
    console.log("🎁cart", cartData);
    console.log("cartdelete", cartTotalPrice);
  };

  // {
  //   loggedIn &&
  //     useEffect(() => {
  //       const fetchOrder = async () => {
  //         let res = await getOrder();
  //         if (!!res.data) {
  //           setOrderData(res.data);
  //         }
  //       };

  //       fetchOrder();
  //       console.log("주문데이터내놔cart", orderData);
  //     }, [cartData]);
  // }

  const onClickOrder = async () => {
    let res = await updateOrder({
      order_id: cartData.order_id,
      total: cartTotalPrice,
      order_status: "prepaid",
    });
    if (!!res.data) {
      setOrderData(res.data);
      console.log("🚛getOrder", orderData);
    }
  };

  return (
    <Page name="cart">
      <Navbar noHairline sliding={false}>
        <NavTitle href="/">장바구니</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
      </Navbar>

      <div className="px-3 flex flex-col items-center">
        {loggedIn ? (
          <div>
            {cartData.length && cartTotalPrice ? (
              <Cart
                cartData={cartData}
                cartTotalPrice={cartTotalPrice}
                onClickDeleteCart={onClickDeleteCart}
                onClickOrder={() => onClickOrder()}
              />
            ) : (
              <NoCart />
            )}
          </div>
        ) : (
          <AskLogin />
        )}
      </div>
    </Page>
  );
};
export default CartPage;
