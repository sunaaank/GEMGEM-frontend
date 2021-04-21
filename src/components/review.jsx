import {
  Block,
  BlockTitle,
  List,
  ListItem,
  AccordionContent,
} from "framework7-react";
import React from "react";

const Review = () => {
  return (
    <>
      <BlockTitle className="mx-4">상품 리뷰</BlockTitle>
      <Block>
        <List mediaList>
          <ListItem
            link="#"
            title="잼잼잼잼잼 상품1"
            after="⭐5"
            subtitle="gem1"
            text="정말정말 유용합니다 요즘 웬만하면 다 이거 쓰는듯. 사람들이 다 쓰는 덴 이유가 있더라고요~"
          >
            <img
              slot="media"
              src="https://cdn1.iconfinder.com/data/icons/seo-82/512/_value-512.png"
              width="80"
            />
          </ListItem>
          <ListItem
            link="#"
            title="잼쨈잼 상품2"
            after="⭐3"
            subtitle="gem2"
            text="적당히 쓸만해요. 속도가 좀 느리지만 사용하는데 크게 불편한 점은 없습니다."
          >
            <img
              slot="media"
              src="https://cdn1.iconfinder.com/data/icons/seo-82/512/_value-512.png"
              width="80"
            />
          </ListItem>
          <ListItem
            link="#"
            title="잼잼잼잼 상품3"
            after="⭐1"
            subtitle="gem3"
            text="업데이트가 되지 않은지 5년이 지났습니다. 다른 거 쓸게요 ㅂㅂ"
          >
            <img
              slot="media"
              src="https://cdn1.iconfinder.com/data/icons/seo-82/512/_value-512.png"
              width="80"
            />
          </ListItem>
        </List>
      </Block>
    </>
  );
};
export default Review;
