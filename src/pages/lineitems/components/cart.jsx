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
    <div>
      <List mediaList>
        <ul className="ul">
          <div className="flex flex-col">
            {cartData.map((item, index) => (
              <div key={index}>
                <ListItem
                  title={item.item.name}
                  after={
                    <i
                      className="f7-icons"
                      value={item.id}
                      onClick={(e) => onClickDeleteCart(e)}
                    >
                      trash
                    </i>
                  }
                  subtitle={`${item.package_type} | ${item.rent_startdate} ~ ${item.rent_enddate}`}
                  text={item.total}
                >
                  <img slot="media" src={item.item.image_url} width="80" />
                </ListItem>
              </div>
            ))}
          </div>
        </ul>
      </List>

      <div className="p-3 text-right">
        <Row>
          <Col width="66">배송비</Col>
          <Col width="33">{cartTotalPrice < 33000 ? 3000 : 0} 원</Col>
        </Row>
        <Row>
          <Col width="66">총 주문금액</Col>
          <Col width="33">{cartTotalPrice} 원</Col>
        </Row>
      </div>

      <Button
        large
        raised
        fill
        className="w-full fixed bottom-10 left-0"
        href="/order"
        onClick={() => onClickOrder()}
      >
        {cartTotalPrice}원 주문하기
      </Button>
    </div>
  );
};

export default Cart;
