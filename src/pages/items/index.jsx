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
import { useRecoilState } from "recoil";
import { itemsDataState } from "../../common/recoil.js";
import ItemList from "../../components/itemlist.jsx";
import { configs } from "../../common/config.js";
import { getToken } from "../../common/auth";
import { getItems, getCategories } from "../../common/api";

const ItemsPage = (props) => {
  // router params 찾아보기
  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  let loggedIn = !!getToken().token;
  const [itemsData, setItemsData] = useRecoilState(itemsDataState);
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
      <Navbar title="GEMGEM" className="no-hairline" />
      <div className="ml-4">
        <ItemList
          itemsData={filterItemsByCategory(1)}
          onClickItem={onClickItem}
          category={categoriesData[0]}
        />
        <ItemList
          itemsData={filterItemsByCategory(16)}
          onClickItem={onClickItem}
          category={categoriesData[10]}
        />
      </div>
    </Page>
  );
};
export default ItemsPage;
