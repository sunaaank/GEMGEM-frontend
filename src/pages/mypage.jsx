import {
  Block,
  BlockTitle,
  f7,
  List,
  ListItem,
  Link,
  Navbar,
  NavTitle,
  NavRight,
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
      <Navbar noHairline sliding={false}>
        <NavTitle href="/">마이페이지</NavTitle>
        <NavRight>
          <Link icon="las la-bars" panelOpen="right" />
        </NavRight>
      </Navbar>
      <div className="px-3 flex flex-col w-full">
        {loggedIn ? (
          <div className="py-3">
            <BlockTitle className="mx-7 mt-6 mb-4 font-semibold text-lg">
              주문내역
            </BlockTitle>
            <div className=" my-4">
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
