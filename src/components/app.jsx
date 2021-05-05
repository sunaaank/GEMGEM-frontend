import {
  App,
  Block,
  Button,
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
import { set } from "lodash";
import React from "react";
import { RecoilRoot } from "recoil";
import { getToken } from "../common/auth";
import { getDevice } from "../js/framework7-custom.js";
import { toast, sleep } from "../js/utils";
import { logout } from "../common/api";
import store from "../common/store";
import routes from "../js/routes";
import i18n from "../lang/i18n";
import "lodash";

global.i18next = i18n;
const MyApp = () => {
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "GEMGEM", // App name
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

  let loggedIn = !!getToken().token;
  const handleLogout = async () => {
    f7.dialog.confirm("로그아웃하시겠습니까?", function () {
      logout();
      toast("로그아웃 되었습니다");
      location.replace("/");
    });
  };

  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  return (
    <RecoilRoot>
      <App {...f7params}>
        <Panel right resizable href={false}>
          <Page>
            <PageContent className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Button
                  href="/items"
                  text="GEM STORE"
                  className="w-30 h-10 px-4 underline text-3xl"
                  panelClose
                />
                <div className="p-3 flex flex-row justify-center w-full">
                  {loggedIn ? (
                    <>
                      <Button
                        fill
                        href="/mypage"
                        text="내 정보"
                        className="w-30 h-10 px-5"
                        panelClose
                      />
                      <Button
                        outline
                        onClick={() => handleLogout()}
                        text="로그아웃"
                        className="w-30 h-10  px-4 ml-3"
                        panelClose
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        outline
                        href="/users/sign_up"
                        text="회원가입"
                        className="w-30 h-10 px-4"
                        panelClose
                      />
                      <Button
                        fill
                        id="user-login"
                        href="/users/sign_in"
                        text="로그인"
                        className="w-30 h-10 px-6 ml-3"
                        panelClose
                      />
                    </>
                  )}
                </div>
              </div>
            </PageContent>
          </Page>
        </Panel>

        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          <Toolbar tabbar labels bottom>
            <Link
              tabLink="#view-home"
              tabLinkActive
              icon="las la-campground"
              text="HOME"
            />
            <Link
              tabLink="#view-items"
              id="tab-items"
              icon="las la-gem"
              text="SHOP"
            />
            <Link tabLink="#view-useritem" icon="las la-search" text="SEARCH" />
            <Link
              tabLink="#view-carts"
              id="tab-cart"
              icon="las la-shopping-basket"
              text="CART"
            />
            {/*<Link
              tabLink="#view-users"
              icon="las la-user-secret"
              text="MYPAGE"
              id="tab-users"
            />*/}
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
          <View id="view-useritem" name="useritem" tab url="/useritem" />
          <View id="view-carts" name="cart" tab url="/cart" />
          {/* <View id="view-users" name="mypage" tab url="/mypage" />*/}
        </Views>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
