import { Button, Link } from "framework7-react";
import React from "react";

const NoCart = (props) => {
  return (
    <div>
      <i className="f7-icons">cart_badge_plus</i>
      <p>장바구니가 비어있어요</p>
      <Button
        large
        raised
        fill
        className="p-3 w-full"
        onClick={() => {
          document.getElementById("tab-items").click();
        }}
      >
        쇼핑하기
      </Button>
    </div>
  );
};

export default NoCart;
