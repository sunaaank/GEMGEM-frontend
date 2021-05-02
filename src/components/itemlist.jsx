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

const ItemsList = ({ itemsData, onClickItem, category }) => {
  return (
    <div>
      <BlockTitle className="pt-10 font-bold">
        {category && category.name}
      </BlockTitle>
      <List mediaList>
        <ul className="ul flex flex-wrap">
          {itemsData.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.price}
              text={item.sub_category.name}
              onClick={() => onClickItem(item.id)}
            >
              <img slot="media" width="80" src={item.image_url} />
            </ListItem>
          ))}
        </ul>
      </List>
    </div>
  );
};
export default ItemsList;
