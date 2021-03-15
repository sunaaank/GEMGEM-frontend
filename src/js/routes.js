
import HomePage from '../pages/home.jsx';
import IntroPage from "../pages/intro.jsx";
import NotFoundPage from '../pages/404.jsx';
import LoginPage from "../pages/users/sessions/new.jsx";
import SignUpPage from "../pages/users/registrations/new.jsx";

const SharedRoutes = [
];

const LoggedOutRoutes = [
  { path: "/", component: IntroPage},
  { path: "/users/sign_in", component: LoginPage },
  { path: "/users/sign_up", component: SignUpPage },
];
const LoggedInRoutes = [
  { path: "/", component: HomePage },
];

export default (isLoggedIn) => [
  ...(isLoggedIn ? LoggedInRoutes : LoggedOutRoutes), 
  ...SharedRoutes,
  { path: "(.*)", component: NotFoundPage }
];
