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

const ItemsList = ({ itemsData, goToItem, category }) => {
  return (
    <>
      <BlockTitle className="pt-10 font-bold">{category.name}</BlockTitle>
      <Block>
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
              <img src={item.image_url} onClick={() => goToItem(item.id)} />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Block>
    </>
  );
};
export default ItemsList;
