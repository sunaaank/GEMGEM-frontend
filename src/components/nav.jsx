import {
  App,
  f7,
  f7ready,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  Searchbar,
  Page,
  PageContent,
  Panel,
  Toolbar,
  View,
  Views,
  theme,
} from "framework7-react";
import "lodash";
import React from "react";

const Nav = () => {
  return (
    <Navbar className="no-hairline bg-white">
      <NavLeft>
        <Link back>Back</Link>
      </NavLeft>
      <NavRight>
        <Link
          searchbarEnable=".searchbar-demo"
          iconIos="f7:search"
          iconAurora="f7:search"
          iconMd="material:search"
        ></Link>
      </NavRight>
      <Searchbar
        className="searchbar-demo"
        expandable
        searchContainer=".search-list"
        searchIn=".item-title"
        disableButton={!theme.aurora}
      ></Searchbar>
    </Navbar>
  );
};
export default Nav;
