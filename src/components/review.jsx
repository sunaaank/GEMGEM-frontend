import {
  Block,
  BlockTitle,
  List,
  ListItem,
  AccordionContent,
} from "framework7-react";
import React from "react";

const Review = ({ name, image_url }) => {
  return (
    <>
      <BlockTitle className="mx-7 mt-6 mb-4 font-semibold text-lg">
        상품 리뷰
      </BlockTitle>
      <Block className="px-4 mb-20">
        <List mediaList className="m-0">
          {REVIEWS_DATA.map((review) => (
            <ListItem
              key={review.id}
              title={name}
              after={review.star}
              text={review.comment}
            >
              <img alt={name} slot="media" src={image_url} width="80" />
            </ListItem>
          ))}
        </List>
      </Block>
    </>
  );
};
export default Review;

const REVIEWS_DATA = [
  {
    id: 1,
    star: "⭐⭐⭐⭐⭐",
    comment:
      "정말정말 유용합니다 요즘 웬만하면 다 이거 쓰는듯. 사람들이 다 쓰는 덴 이유가 있더라고요~",
  },
  {
    id: 2,
    star: "⭐⭐⭐",
    comment:
      "적당히 쓸만해요. 속도가 좀 느리지만 사용하는데 크게 불편한 점은 없습니다.",
  },
  {
    id: 3,
    star: "⭐",
    comment: "업데이트가 되지 않은지 5년이 지났습니다. 다른 거 쓸게요 ㅂㅂ",
  },
];
