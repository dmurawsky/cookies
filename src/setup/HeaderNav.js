import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, Glyphicon } from 'react-bootstrap';

const HeaderNav = () => {
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/"><img src="/img/logo.png" /></IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <p className="navbar-text pull-right" id="se-navbar-phone"><Glyphicon glyph="earphone" /> (941) 203-3531</p>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNav;
