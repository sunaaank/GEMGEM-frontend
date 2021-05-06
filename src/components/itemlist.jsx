import {
  Block,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  List,
  ListItem,
  Title,
  Swiper,
  SwiperSlide,
  Link,
} from "framework7-react";
import React from "react";

const ItemsList = ({ itemsData, onClickItem }) => {
  return (
    <div>
      <List mediaList className="mb-20">
        <ul className="ul flex flex-col flex-nowrap ">
          {itemsData.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              subtitle={Number(item.price).toLocaleString()}
              text={item.sub_category.name}
              onClick={() => onClickItem(item.id)}
            >
              <img
                alt={item.name}
                slot="media"
                width="100"
                src={item.image_url}
              />
            </ListItem>
          ))}
        </ul>
      </List>
    </div>
  );
};
export default ItemsList;
