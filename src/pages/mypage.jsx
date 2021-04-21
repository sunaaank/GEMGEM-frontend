import {
  Block,
  BlockTitle,
  Button, Col, Link,
  List,
  ListItem, Navbar,
  NavLeft,
  NavTitle, Page,
  Row
} from 'framework7-react';
import React from 'react';
import Nav from '../components/nav.jsx'
import { logout } from '../common/api';
import { login } from '../common/api';
import { signup } from '../common/api';
import { getToken } from '../common/auth';

const MyPage = () => {
  let loggedIn = !!getToken().token;
  const handleLogout = async ()=>{
    await logout()
    location.replace('/')
  }
  const handleLogin = async ()=>{
    await login()
    location.replace('/')
  }
  const handleSignup = async ()=>{
    await signup()
    location.replace('/')
  }
  return <Page name="mypage">
      {/* Top Navbar */}
      {/*<Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      <div className="bg-white">
      </div>
      */}
      <Nav />
      
      {/* Page content */}
      <div className="p-3 flex flex-col items-center">
        <p>여기는 마이페이지 입니다.</p>
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
      </div>

    </Page>
};
export default MyPage;