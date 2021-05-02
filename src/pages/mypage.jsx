import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Navbar,
  Swiper,
  SwiperSlide,
  Page,
} from "framework7-react";
import React from "react";
import { useRecoilState } from "recoil";
import { itemsDataState } from "../common/recoil.js";
import { logout } from "../common/api";
import { getToken } from "../common/auth";
import ItemsSwiper from "../components/itemsSwiper.jsx";

const MyPage = () => {
  const [itemsData, setItemsData] = useRecoilState(itemsDataState);
  let loggedIn = !!getToken().token;
  const handleLogout = async () => {
    await logout();
    location.replace("/");
  };

  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  return (
    <Page name="mypage">
      <Navbar title="마이페이지" noHairline sliding={false} />
      <div className="p-3 flex flex-col items-center">
        <List>
          <ListItem
            title="회원가입"
            link="/users/sign_up"
            icon="las la-question"
            panelClose
          ></ListItem>
        </List>

        <List>
          {loggedIn ? (
            <ListItem
              title="로그아웃"
              link="#"
              icon="las la-question"
              panelClose
              onClick={handleLogout}
            ></ListItem>
          ) : (
            <ListItem
              title="로그인"
              link="/users/sign_in"
              icon="las la-question"
              panelClose
            ></ListItem>
          )}
        </List>
      </div>
      <div className="ml-4">
        <ItemsSwiper itemsData={itemsData} onClickItem={onClickItem} />
      </div>
    </Page>
  );
};
export default MyPage;
