import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2022 <SourceLink>Formify</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
