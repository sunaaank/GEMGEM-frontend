import HomePage from "../pages/home.jsx";
import LoginPage from "../pages/users/sessions/new.jsx";
import SignUpPage from "../pages/users/registrations/new.jsx";
import IntroPage from "../pages/intro.jsx";
import ItemsPage from "../pages/items/index.jsx";
import ItemPage from "../pages/items/show.jsx";
import UserItemPage from "../pages/useritem.jsx";
import CartPage from "../pages/lineitems/index.jsx";
import OrderPage from "../pages/order.jsx";
import MyPage from "../pages/mypage.jsx";
import NotFoundPage from "../pages/404.jsx";

const routes = [
  { path: "/", component: HomePage },
  { path: "/users/sign_in", component: LoginPage },
  { path: "/users/sign_up", component: SignUpPage },
  { path: "/about/", component: IntroPage },
  {
    path: "/items",
    component: ItemsPage,
    detailRoutes: [{ path: "/items/:id/", component: ItemPage }],
  },
  { path: "/item", component: ItemPage },
  { path: "/useritem", component: UserItemPage },
  { path: "/cart", component: CartPage },
  { path: "/order", component: OrderPage },
  { path: "/mypage", component: MyPage },
  { path: "(.*)", component: NotFoundPage },
];

export default routes;
