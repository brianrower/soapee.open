import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Icon, Menu, Header } from 'semantic-ui-react';

import useMedia, { mobile } from 'hooks/useMedia';

import './navBar.styl';


export default function NavBar() {
  const isMobile = useMedia(mobile);

  return (
    <div className="navbar">
      <Container>
        {isMobile && <NavBarMobile />}
        {!(isMobile) && <NavBarDesktop />}
      </Container>
    </div>
  );
}


const NavBarDesktop = () => (
  <Menu inverted borderless color="black">
    <Menu.Item>
      <Link to="/">
        <Header inverted>Soapee</Header>
      </Link>
    </Menu.Item>

    <MenuItems />
  </Menu>
);

function NavBarMobile() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Menu inverted borderless color="black">
        <Menu.Item>
          <Link to="/">
            <Header inverted>Soapee</Header>
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item onClick={toggleMenu}>
            <Icon name="bars" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {visible && (
        <Menu inverted className="mobile-dropdown" color="grey" vertical fluid>
          <MenuItems />
        </Menu>
      )}
    </>
  );

  //

  function toggleMenu() {
    setVisible(prev => !(prev));
  }
}

const MenuItems = () => (
  <>
    <Menu.Item as={NavLink} name="Calculator" to="/calculator" />
    <Menu.Item as={NavLink} name="Recipes" to="/recipes" />
  </>
);
