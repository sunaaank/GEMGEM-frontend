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
import Nav from "../../components/nav.jsx";
import { getToken } from "../../common/auth";
import { getCart } from "../../common/api";

const CartPage = () => {
  let loggedIn = !!getToken().token;
  const [cartData, setCartData] = useState([]);
  const [selectedCartData, setSelectedCartData] = useState([]);

  const initialCart = () => {
    const cartItem = [];
    for (let i = 0; i < cartData.length; i++) {
      cartItem.push(`Product${i + 1}`);
    }
    setSelectedCartData(cartItem);
  };

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
      }, []);
    console.log("🎁cart", cartData);
  }
  console.log("✅", selectedCartData);

  const onProductChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      selectedCartData.push(value);
    } else {
      selectedCartData.splice(selectedCartData.indexOf(value), 1);
    }
    setSelectedCartData([...selectedCartData]);
  };

  const onProductsChange = () => {
    if (selectedCartData.length < cartData.length) {
      initialCart();
    } else if (selectedCartData.length === cartData.length) {
      setSelectedCartData([]);
    }
  };
  return (
    <Page name="cart">
      <Nav />
      <a href="/order">주문 페이지 미리보기</a>
      <div className="p-3 flex flex-col items-center">
        <BlockTitle>장바구니</BlockTitle>
        {loggedIn ? (
          <List>
            <ListItem
              checkbox
              title="전체 선택"
              name="demo-checkbox"
              checked={selectedCartData.length === cartData.length}
              indeterminate={selectedCartData.length === 1}
              onChange={(e) => onProductsChange(e)}
            >
              <ul slot="root">
                <div className="flex flex-col">
                  {cartData.map((item, index) => (
                    <ListItem
                      key={index}
                      checkbox
                      name="demo-checkbox"
                      value={`Product${index + 1}`}
                      checked={
                        selectedCartData.indexOf(`Product${index + 1}`) >= 0
                      }
                      onChange={(e) => onProductChange(e)}
                    >
                      <div>
                        <Link href="#">
                          <div>
                            <h2>{item.item.name}</h2>
                            <p>{item.unit_price}</p>
                            <div>
                              <p>상품 대여 기간</p>
                              <p>
                                {item.rent_startdate}~{item.rent_enddate}
                              </p>
                            </div>
                            <div>
                              <p>상품 포장 옵션</p>
                              <p>{item.package_type}</p>
                            </div>
                            <div>
                              <p>상품 총 금액</p>
                              <h4>{item.total}</h4>
                            </div>
                          </div>

                          <img
                            slot="media"
                            src={item.item.image_url}
                            width="80"
                          />
                        </Link>
                      </div>
                    </ListItem>
                  ))}
                </div>
              </ul>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem
              title="회원가입"
              link="/users/sign_up"
              icon="las la-question"
              panelClose
            />

            <ListItem
              title="로그인"
              link="/users/sign_in"
              icon="las la-question"
              panelClose
            />
          </List>
        )}
      </div>
    </Page>
  );
};
export default CartPage;
