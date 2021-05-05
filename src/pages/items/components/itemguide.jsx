import { Block, List, ListItem, AccordionContent } from "framework7-react";
import React from "react";

const ItemGuide = () => {
  return (
    <List accordionList>
      <ListItem accordionItem title="구입 안내" className="px-7">
        <AccordionContent>
          <Block>
            <p>
              ✅ 상품 결제 후 반품 및 환불은 불가합니다. <br /> ✅ 신중히
              구매부탁드립니다.
            </p>
          </Block>
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="매장 위치 안내" className="px-7">
        <AccordionContent>
          <List>
            <ListItem title="성수점">
              서울시 성동구 성수일로19길 인썸니아
            </ListItem>
            <ListItem title="선릉점">
              서울시 강남구 테헤란로 427 위워크
            </ListItem>
          </List>
        </AccordionContent>
      </ListItem>
    </List>
  );
};
export default ItemGuide;
