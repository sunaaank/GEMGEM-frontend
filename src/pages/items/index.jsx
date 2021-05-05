import {
  Block,
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
import { getItems, getCategories } from "../../common/api";

const ItemsPage = (props) => {
  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

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
            {CATEGORY_CHIPS.map((chip) => (
              <Link
                key={chip.id}
                tabLink={`#tab-${chip.id}`}
                tabLinkActive={chip.id === 1 && true}
                className={`h-20 ${chip.id === 1 ? "w-full" : "block"} ${
                  chip.id === 2 && "mx-2"
                }`}
              >
                <Chip
                  outline={currentTab !== chip.tab && true}
                  text={chip.name}
                  color={currentTab !== "tab2" ? "red" : "black"}
                  tooltipTrigger="hover"
                  onClick={() => setCurrentTab(chip.tab)}
                  className={`h-9 flex justify-center ${
                    chip.id === 1 ? "w-20" : "w-full"
                  } ${chip.id === 2 && "mx-1"}
                  `}
                />
              </Link>
            ))}
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

const CATEGORY_CHIPS = [
  { id: 1, name: "ALL", tab: "tab1" },
  {
    id: 2,
    name: "Rails Plugins",
    tab: "tab2",
  },
  {
    id: 3,
    name: "Active Record",
    tab: "tab3",
  },
];
