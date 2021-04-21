import {
  App,
  f7,
  f7ready,
  Link,
  List,
  ListItem,
  Navbar,
  Page,
  PageContent,
  Panel,
  Toolbar,
  View,
  Views,
} from "framework7-react";
import "lodash";
import React from "react";
import { logout } from "../common/api";
import { login } from "../common/api";
import { signup } from "../common/api";
import { getToken } from "../common/auth";
import store from "../common/store";
import { getDevice } from "../js/framework7-custom.js";
import routes from "../js/routes";
import i18n from "../lang/i18n";

global.i18next = i18n;

const MyApp = () => {
  // Login screen demo data
  let loggedIn = !!getToken().token;
  const handleLogout = async () => {
    await logout();
    location.replace("/");
  };
  const handleLogin = async () => {
    await login();
    location.replace("/");
  };
  const handleSignup = async () => {
    await signup();
    location.replace("/");
  };

  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "Practice", // App name
    theme: "ios", // Automatic theme detection
    id: "com.insomenia.practice", // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,
    // Input settings
    view: {
      iosDynamicNavbar: getDevice().ios,
    },
  };

  return (
    <App {...f7params}>
      {/* Left panel with cover effect*/}
      {/*<Panel left cover>
          <Page>
            <Navbar title="메뉴"/>
            <PageContent>
               <List>
               <ListItem title="회원가입" link="/users/sign_up" icon="las la-question" panelClose onClick={handleSignup}></ListItem>
              </List>
              <List>
               <ListItem title="로그인" link="/users/sign_in" icon="las la-question" panelClose onClick={handleLogin}></ListItem>
              </List>
              <List>
                { loggedIn && 
                  <ListItem title="로그아웃" link="#" icon="las la-question" panelClose onClick={handleLogout}></ListItem>
                }
              </List>
            </PageContent>
          </Page>
              </Panel>*/}

      <Views tabs className="safe-areas">
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar labels bottom>
          <Link
            tabLink="#view-home"
            tabLinkActive
            icon="las la-campground"
            text="HOME"
          />
          <Link tabLink="#view-items" icon="las la-gem" text="SHOP" />
          <Link tabLink="#view-wishlist" icon="las la-box" text="MYGEM" />
          <Link
            tabLink="#view-carts"
            icon="las la-shopping-basket"
            text="CART"
          />
          <Link tabLink="#view-users" icon="las la-user-secret" text="MYPAGE" />
        </Toolbar>
        <View
          id="view-home"
          name="home"
          main
          tab
          tabActive
          url="/"
          iosDynamicNavbar={false}
        />
        <View id="view-items" name="items" tab url="/items" />
        <View id="view-wishlist" name="wishlist" tab url="/wishlist" />
        <View id="view-carts" name="cart" tab url="/cart" />
        <View id="view-users" name="mypage" tab url="/mypage?is_main=true" />
      </Views>
    </App>
  );
};
export default MyApp;
