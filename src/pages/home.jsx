import {
  Block,
  BlockTitle,
  Button, Col, Link,
  List,
  ListItem, Navbar,
  NavLeft,
  NavTitle, Page,
  Row
} from 'framework7-react';
import React from 'react';


const HomePage = () => {
  return <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      <div className="bg-white">
      </div>
      
      {/* Page content */}
      <div className="p-3">
        <p>This is an example of tabs-layout application. The main point of such tabbed layout is that each tab contains independent view with its own routing and navigation.</p>
        <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
      </div>
      <List>
        <ListItem link="/about/" title="About"/>
      </List>

    </Page>
  };
export default HomePage;