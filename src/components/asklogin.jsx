import { Button } from "framework7-react";
import React from "react";

const AskLogin = () => {
  return (
    <div className="flex flex-col items-center py-32">
      <i id="ask_login" className="f7-icons text-gray-200">
        person_crop_circle_badge_exclam
      </i>
      <p className="my-4">로그인 후 이용가능합니다</p>
      <div className="pt-4 pb-10">
        <div className="flex justify-center w-full">
          <Button
            large
            outline
            href="/users/sign_up"
            color="black"
            className="p-3 mr-4 px-10 border-black"
          >
            회원가입
          </Button>
          <Button
            large
            fill
            href="/users/sign_in"
            color="black"
            className="p-3 px-10"
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskLogin;
