import { Button } from "framework7-react";
import React from "react";

const NoCart = (props) => {
  return (
    <div className="flex flex-col items-center h-screen py-32">
      <i id="no_cart" className="f7-icons text-gray-200">
        cart_badge_plus
      </i>
      <p className="my-4">장바구니가 비어있습니다</p>
      <div className="pt-4 py-10">
        <Button
          large
          fill
          color="black"
          className="p-3 px-10"
          onClick={() => {
            document.getElementById("tab-items").click();
          }}
        >
          잼 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default NoCart;
