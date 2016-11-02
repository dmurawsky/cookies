import React, {PropTypes} from 'react';
import { IndexLink } from 'react-router';
import { Navbar, NavItem, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class HeaderNav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.showSignIn = this.showSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.openCart = this.openCart.bind(this);
  }

  showSignIn(){
    this.props.showSignIn();
  }

  signOut(){
    this.props.signOut();
  }

  openCart() {
    this.props.openCart();
  }

  getCart() {
    if(this.props.cartTotals.qty>0){
      return (
        <Nav pullRight>
          <NavItem onClick={this.openCart}><Badge>{this.props.cartTotals.qty}</Badge> Cart</NavItem>
        </Nav>
      );
    }
  }

  getMenu() {
    if(this.props.userSignedIn){
      return (
        <Nav pullRight>
          <LinkContainer to="/my-stuff"><NavItem>My Stuff</NavItem></LinkContainer>
          <LinkContainer to="/account"><NavItem>Account</NavItem></LinkContainer>
          <NavItem onClick={this.signOut}>Sign Out</NavItem>
        </Nav>
      );
    }else{
      return (
        <Nav pullRight>
          <NavItem onClick={this.showSignIn}>Sign In</NavItem>
        </Nav>
      );
    }
  }

  render() {
    return (
      <Navbar id="navHeader" fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/"><img style={{display:"inline"}} src="https://s3-us-west-2.amazonaws.com/stowedge/logo-small.png"/> <small><sup>beta</sup></small></IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/add-stuff"><NavItem>Store Stuff</NavItem></LinkContainer>
            <LinkContainer to="/pricing"><NavItem>Pricing</NavItem></LinkContainer>
            <LinkContainer to="/faqs"><NavItem>FAQs</NavItem></LinkContainer>
          </Nav>
          {this.getCart()}
          {this.getMenu()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

HeaderNav.propTypes = {
  signOut: PropTypes.func.isRequired,
  showSignIn: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  cartTotals: PropTypes.object.isRequired,
  userSignedIn: PropTypes.bool
};

export default HeaderNav;
