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
import { getItems, getCategories } from "../../common/api";

const ItemsPage = (props) => {
  // router params 찾아보기
  const goToItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  let loggedIn = !!getToken().token;
  const [itemsData, setItemsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

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

  useEffect(() => {
    const fetchCategories = async () => {
      let res = await getCategories();
      if (!!res.data) {
        setCategoriesData(res.data);
      }
    };

    fetchCategories();
  }, []);

  const filterItemsByCategory = (id) => {
    return itemsData.filter((item) => item.sub_category.category_id === id);
  };

  return (
    <Page name="items">
      <Nav />
      <ItemList
        itemsData={filterItemsByCategory(1)}
        goToItem={goToItem}
        category={categoriesData[0]}
      />
      <ItemList
        itemsData={filterItemsByCategory(16)}
        goToItem={goToItem}
        category={categoriesData[10]}
      />
    </Page>
  );
};
export default ItemsPage;
