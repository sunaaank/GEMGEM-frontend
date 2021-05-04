import {
  Block,
  BlockTitle,
  Chip,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Navbar,
  NavTitle,
  NavRight,
  Page,
  PageContent,
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
  const [currentTab, setCurrentTab] = useState("tab1");

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
    <Page name="items" pageContent={false}>
      <Navbar noHairline sliding={false}>
        <NavTitle href="/">GEMGEM</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
      </Navbar>
      <PageContent className="hide-bars-on-scroll hide-toolbar-on-scroll m-0 p-0 bg-white">
        <Toolbar
          tabbar
          position="top"
          noShadow
          noHairline
          inner={false}
          className="bg-transparent mt-0 mb-4 py-0"
        >
          <div className="flex flex-row justify-center mt-0 p-0 bg-white tabbar-scrollable">
            <Link tabLink="#tab-1" tabLinkActive className="w-full h-20">
              <Chip
                outline={currentTab !== "tab1" && true}
                text="ALL"
                color={currentTab !== "tab2" ? "red" : "black"}
                tooltipTrigger="hover"
                onClick={() => setCurrentTab("tab1")}
                className=" w-20 h-9 flex justify-center"
              />
            </Link>
            <Link tabLink="#tab-2" className="block h-20 mx-2">
              <Chip
                outline={currentTab !== "tab2" && true}
                text="Rails Plugins"
                color={currentTab !== "tab2" ? "red" : "black"}
                tooltipTrigger="hover"
                className="w-full h-9 mx-1 flex justify-center"
                onClick={() => setCurrentTab("tab2")}
              />
            </Link>
            <Link tabLink="#tab-3" className="block h-20 ">
              <Chip
                outline={currentTab !== "tab3" && true}
                text="Active Record"
                color={currentTab !== "tab2" ? "red" : "black"}
                tooltipTrigger="hover"
                className="w-full h-9 flex justify-center"
                onClick={() => setCurrentTab("tab3")}
              />
            </Link>
          </div>
        </Toolbar>
        <Tabs className="my-0 mx-6 p-0">
          <Tab id="tab-1" className="page-content  m-0 p-0 " tabActive>
            <Block>
              <ItemList itemsData={itemsData} onClickItem={onClickItem} />
            </Block>
          </Tab>
          <Tab id="tab-2" className="page-content  m-0 p-0">
            <Block>
              <ItemList
                itemsData={filterItemsByCategory(16)}
                onClickItem={onClickItem}
              />
            </Block>
          </Tab>
          <Tab id="tab-3" className="page-content  m-0 p-0 ">
            <Block>
              <ItemList
                itemsData={filterItemsByCategory(1)}
                onClickItem={onClickItem}
              />
            </Block>
          </Tab>
        </Tabs>
      </PageContent>
    </Page>
  );
};
export default ItemsPage;
