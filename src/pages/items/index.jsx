import {
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  Swiper,
  SwiperSlide,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import Nav from "../../components/nav.jsx";
import ItemList from "../../components/itemlist.jsx";
import { configs } from "../../common/config.js";
import { getToken } from "../../common/auth";
import { getItems } from "../../common/api";

const ItemsPage = (props) => {
  // router params 찾아보기
  const goToItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  let loggedIn = !!getToken().token;
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let res = await getItems();
      if (!!res.data.result) {
        setItemsData(res.data.result);
      }
    };

    fetchItems();
  }, []);
  console.log("💌Items", itemsData);

  return (
    <Page name="items">
      <Nav />
      <ItemList itemsData={itemsData} goToItem={goToItem} />

      <List>
        {[1, 2, 3].map((n) => (
          <ListItem key={n} title={`Item ${n}`} />
        ))}
      </List>
    </Page>
  );
};
export default ItemsPage;
