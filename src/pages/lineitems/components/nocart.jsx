import { Button, Link } from "framework7-react";
import React from "react";

const NoCart = (props) => {
  return (
    <div className="flex flex-col items-center h-screen py-40">
      <i className="f7-icons text-gray-200" size="150">
        cart_badge_plus
      </i>
      <div className="py-10">
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
