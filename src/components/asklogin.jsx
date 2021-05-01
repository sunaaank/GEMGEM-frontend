import { List, ListItem } from "framework7-react";
import React from "react";

const AskLogin = () => {
  return (
    <List>
      <ListItem
        title="회원가입"
        link="/users/sign_up"
        icon="las la-question"
        panelClose
      />

      <ListItem
        title="로그인"
        link="/users/sign_in"
        icon="las la-question"
        panelClose
      />
    </List>
  );
};

export default AskLogin;
