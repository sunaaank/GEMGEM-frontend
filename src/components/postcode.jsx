import { Button, Col, List, ListItem, Input, Row } from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode";

const PostCode = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
  };

  return (
    <div>
      <DaumPostcode onComplete={handleComplete} />
    </div>
  );
};

export default PostCode;
