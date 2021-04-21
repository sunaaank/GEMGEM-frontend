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
import React, { useState } from "react";
import Nav from "../components/nav.jsx";

const CartPage = () => {
  const [products, setProducts] = useState(["Product1"]);
  const onProductChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      products.push(value);
    } else {
      products.splice(products.indexOf(value), 1);
    }
    setProducts([...products]);
  };
  const onProductsChange = () => {
    if (products.length === 1 || products.length === 0) {
      setProducts(["Product1", "Product2"]);
    } else if (products.length === 2) {
      setProducts([]);
    }
  };
  return (
    <Page name="cart">
      <Nav />
      <div className="p-3 flex flex-col items-center">
        <BlockTitle>장바구니</BlockTitle>
        <List>
          <ListItem
            checkbox
            title="Products"
            name="demo-checkbox"
            checked={products.length === 2}
            indeterminate={products.length === 1}
            onChange={(e) => onProductsChange(e)}
          >
            <ul slot="root">
              <ListItem
                checkbox
                title="Product1"
                name="demo-checkbox"
                value="Product1"
                checked={products.indexOf("Product1") >= 0}
                onChange={(e) => onProductChange(e)}
              />
              <ListItem
                checkbox
                title="Product2"
                name="demo-checkbox"
                value="Product2"
                checked={products.indexOf("Product2") >= 0}
                onChange={(e) => onProductChange(e)}
              />
            </ul>
          </ListItem>
        </List>
      </div>
    </Page>
  );
};
export default CartPage;
