import {
  Block,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  List,
  ListItem,
  Swiper,
  SwiperSlide,
  Link,
} from "framework7-react";
import React from "react";

const ItemsSwiper = ({ itemsData, onClickItem }) => {
  return (
    <>
      <BlockTitle className="mx-7 mt-6 mb-4 font-semibold text-lg">
        최근 주문한 상품
      </BlockTitle>
      <Block className="ml-7">
        <Swiper
          navigation
          speed={500}
          slidesPerView={2.3}
          spaceBetween={20}
          observer
          observeParents
        >
          {itemsData.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image_url} onClick={() => onClickItem(item.id)} />
              <h2 className="font-medium text-base pt-1">{item.name}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </Block>
    </>
  );
};
export default ItemsSwiper;
