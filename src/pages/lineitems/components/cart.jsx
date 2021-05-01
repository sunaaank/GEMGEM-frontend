import {
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartDataState } from "../../../common/recoil.js";

const Cart = ({ cartData, onClickDeleteCart, onClickOrder }) => {
  return (
    <div>
      <List mediaList>
        <ul className="ul">
          <div className="flex flex-col">
            {cartData.map((item, index) => (
              <div key={index}>
                <ListItem
                  link="#"
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
          <Col width="33">0원</Col>
        </Row>
        <Row>
          <Col width="66">총 주문금액</Col>
          <Col width="33">totalprice</Col>
        </Row>
      </div>

      <Button
        large
        raised
        fill
        className="p-3 w-full"
        href="/order"
        onClick={() => onClickOrder()}
      >
        주문하기
      </Button>
    </div>
  );
};

export default Cart;
