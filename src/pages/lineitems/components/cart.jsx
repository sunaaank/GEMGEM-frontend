import { Button, Col, List, ListItem, Row } from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

const Cart = ({
  cartData,
  cartTotalPrice,
  onClickDeleteCart,
  onClickOrder,
}) => {
  return (
    <div className="mb-20">
      <List mediaList className="mt-0">
        <ul className="ul">
          <div className="flex flex-col">
            {cartData.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <div className="flex flex-row justify-between">
                    <div className="text-xl font-medium">{item.item.name}</div>
                    <div className="item-after">
                      <i
                        className="f7-icons text-2xl"
                        value={item.id}
                        onClick={(e) => onClickDeleteCart(e)}
                      >
                        trash
                      </i>
                    </div>
                  </div>
                  <div className="item-subtitle">{item.total} 원</div>
                  <div className="item-subtitle">{`${item.package_type} | ${item.rent_startdate} ~ ${item.rent_enddate}`}</div>
                  <img
                    alt={item.item.name}
                    slot="media"
                    src={item.item.image_url}
                    width="80"
                  />
                </ListItem>
              </div>
            ))}
          </div>
        </ul>
      </List>
      <div className="flex flex-col font-medium text-lg">
        <Row className="flex flex-row mb-2 w-full text-right">
          <Col width="60">
            <p>배송비</p>
          </Col>
          <Col width="40">
            <p>{cartTotalPrice < 33000 ? 3000 : 0} 원</p>
          </Col>
        </Row>
        <Row className="flex flex-row w-full text-right">
          <Col width="60">
            <p>총 주문금액</p>
          </Col>
          <Col width="40">
            <p className="font-bold text-2xl text-red-500">
              {cartTotalPrice} 원
            </p>
          </Col>
        </Row>
      </div>

      <Button
        large
        raised
        fill
        className="w-full fixed bottom-14 left-0"
        href="/order"
        onClick={() => onClickOrder()}
      >
        {cartTotalPrice}원 주문하기
      </Button>
    </div>
  );
};

export default Cart;
