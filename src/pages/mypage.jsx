import {
  Block,
  BlockTitle,
  f7,
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
import { toast, sleep } from "../js/utils";
import ItemsSwiper from "../components/itemsSwiper.jsx";
import AskLogin from "../components/asklogin.jsx";

const MyPage = () => {
  const [itemsData, setItemsData] = useRecoilState(itemsDataState);
  let loggedIn = !!getToken().token;
  // const handleLogout = async () => {
  //   f7.dialog.confirm("로그아웃하시겠습니까?", function () {
  //     logout();
  //     toast("로그아웃 되었습니다");
  //     location.replace("/");
  //   });
  // };

  const onClickItem = (id) => {
    props.f7router.navigate(`/items/${id}/`);
  };

  return (
    <Page name="mypage">
      <Navbar title="마이페이지" noHairline sliding={false} href="/" />
      <div className="px-3 flex flex-col items-center">
        {loggedIn ? (
          <div>
            <p>주문내역</p>
            <div className="ml-4">
              <ItemsSwiper
                itemsData={itemsData}
                onClickItem={() => onClickItem()}
              />
            </div>
          </div>
        ) : (
          <AskLogin />
        )}
      </div>
    </Page>
  );
};
export default MyPage;
