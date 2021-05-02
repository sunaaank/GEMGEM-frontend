import { BlockTitle, Page, f7, Navbar } from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  alreadyHasCartState,
  alreadyHasItemState,
} from "../../common/recoil.js";
import Cart from "../lineitems/components/cart.jsx";
import NoCart from "../lineitems/components/nocart.jsx";
import AskLogin from "../../components/asklogin.jsx";
import { getToken } from "../../common/auth";
import { deleteCart, updateOrder } from "../../common/api";
import { date } from "yup";

const CartPage = () => {
  let loggedIn = !!getToken().token;
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [selectedCartData, setSelectedCartData] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );
  const [alreadyHasCart, setAlreadyHasCart] = useRecoilState(
    alreadyHasCartState
  );
  const [alreadyHasItem, setAlreadyHasItem] = useRecoilState(
    alreadyHasItemState
  );

  // const initialCart = () => {
  //   const cartItem = [];
  //   for (let i = 0; i < cartData.length; i++) {
  //     cartItem.push(`Product${i + 1}`);
  //   }
  //   setSelectedCartData(cartItem);
  // };

  const onClickDeleteCart = (e) => {
    console.log("item_id를 잡아봅시다", e.target.getAttribute("value"));
    const deleteCartItem = async () => {
      let res = await deleteCart({
        item_id: e.target.getAttribute("value"),
      });
      if (!!res.data) {
        setCartData(res.data);

        f7.dialog.alert("상품이 삭제되었습니다");
      }
    };

    deleteCartItem();
    console.log("🎁cart", cartData);
    console.log("cartdelete", cartTotalPrice);
  };

  const onClickOrder = async () => {
    await updateOrder({
      // total: totalprice,
      order_status: "prepaid",
    });
    // 🚩🚩🚩 모달창 추가하기(장바구니 바로가기 or 쇼핑 계속하기)
    f7.dialog.alert("주문서 작성 중입니다. 잠시만 기다려주세요.");
    console.log("주문하기 버튼 클릭");
  };

  return (
    <Page name="cart" noToolbar>
      <Navbar title="장바구니" className="no-hairline" />
      <a href="/order">주문 페이지 미리보기</a>
      <div className="p-3 flex flex-col items-center">
        {loggedIn ? (
          <div>
            {cartData && cartTotalPrice ? (
              <Cart
                cartData={cartData}
                cartTotalPrice={cartTotalPrice}
                onClickDeleteCart={onClickDeleteCart}
                onClickOrder={onClickOrder}
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
