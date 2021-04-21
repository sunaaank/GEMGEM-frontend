import { Block, List, ListItem, AccordionContent } from "framework7-react";
import React from "react";

const ItemGuide = () => {
  return (
    <List accordionList>
      <ListItem accordionItem title="구입안내">
        <AccordionContent>
          <Block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              elementum id neque nec commodo. Sed vel justo at turpis laoreet
              pellentesque quis sed lorem. Integer semper arcu nibh, non mollis
              arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
              dui sollicitudin. Donec eu arcu dignissim felis viverra blandit
              suscipit eget ipsum.
            </p>
          </Block>
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="기타">
        <AccordionContent>
          <List>
            <ListItem title="Item 1"></ListItem>
            <ListItem title="Item 2"></ListItem>
            <ListItem title="Item 3"></ListItem>
            <ListItem title="Item 4"></ListItem>
          </List>
        </AccordionContent>
      </ListItem>
    </List>
  );
};
export default ItemGuide;
