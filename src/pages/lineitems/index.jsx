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
import AskLogin from "../../components/askLogin.jsx";
import { getToken } from "../../common/auth";
import { deleteCart, updateOrder } from "../../common/api";
import { toast } from "../../js/utils.js";

const CartPage = () => {
  let loggedIn = !!getToken().token;
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
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
  };

  const onClickOrder = async () => {
    let res = await updateOrder({
      order_id: orderData.id,
      total: cartTotalPrice,
    });
    if (!!res.data) {
      setOrderData(res.data);
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
