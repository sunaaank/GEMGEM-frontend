import {
  Link,
  List,
  ListItem,
  Navbar,
  NavRight,
  NavTitle,
  Subnavbar,
  Searchbar,
  Page,
  theme,
} from "framework7-react";
import React from "react";
import { useRecoilState } from "recoil";
import { itemsDataState } from "../../common/recoil.js";

const UserItemPage = (props) => {
  const [itemsData, setItemsData] = useRecoilState(itemsDataState);
  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  return (
    <Page name="useritem">
      <Navbar className="no-hairline">
        <NavTitle href="/">FIND GEMGEM</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
        <Subnavbar inner={false}>
          <Searchbar
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButton={!theme.aurora}
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <div className="searchbar-backdrop"></div>
      <List className="searchbar-not-found">
        <ListItem title="검색 결과가 없습니다"></ListItem>
      </List>
      <List className="search-list searchbar-found">
        <div className="px-3 m-0">
          <div className="mx-1">
            <ul className="ul flex flex-row justify-center flex-wrap">
              {itemsData.map((item, index) => (
                <div key={index}>
                  <ListItem className="p-0 m-0">
                    <div className="flex flex-col items-center">
                      <img
                        alt={item.name}
                        src={item.image_url}
                        width="120"
                        className="mx-3"
                        onClick={() => onClickItem(item.id)}
                      />
                      <div className="item-title">{item.name}</div>
                    </div>
                  </ListItem>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </List>
    </Page>
  );
};
export default UserItemPage;
