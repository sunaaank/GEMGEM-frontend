import {
  Block,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Swiper,
  SwiperSlide,
  Link,
} from "framework7-react";
import React from "react";

const ItemsList = () => {
  return (
    <>
      <Block>
        <BlockTitle className="pt-10 font-bold">리스트 이름 1</BlockTitle>
        <Swiper navigation speed={500} slidesPerView={2.3} spaceBetween={20}>
          <SwiperSlide>
            <img src="https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png" />
            <h2>잼1111111</h2>
            <p>100000원</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png" />
          </SwiperSlide>
          <SwiperSlide>이미지 넣기 전🎄</SwiperSlide>
        </Swiper>
      </Block>
    </>
  );
};
export default ItemsList;
