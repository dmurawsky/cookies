import React, {PropTypes} from 'react';
import { IndexLink, Link } from 'react-router';
import { Navbar, NavItem, Nav, Badge, Glyphicon } from 'react-bootstrap';
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
      window.Intercom('trackEvent', 'cart-qty', {qty:this.props.cartTotals.qty});
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
          <LinkContainer key="my-stuff" to="/my-stuff"><NavItem>My Stuff</NavItem></LinkContainer>
          <LinkContainer key="account" to="/account"><NavItem>Account</NavItem></LinkContainer>
          <NavItem key="sign-out" onClick={this.signOut}>Sign Out</NavItem>
        </Nav>
      );
    }else{
      return [
        <Link key="sign-up" to="/signup" className="btn btn-primary navbar-btn pull-right">Sign Up</Link>,
        <button key="sign-in" type="button" className="btn btn-info navbar-btn pull-right" onClick={this.showSignIn}>Sign In</button>
      ];
    }
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/"><img style={{display:"inline"}} src="https://s3-us-west-2.amazonaws.com/stowedge/logo-small.png"/> <small><sup>beta</sup></small></IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.getMenu()}
          <Nav pullRight>
            {this.getCart()}
          </Nav>
          <p className="navbar-text pull-right" id="se-navbar-phone"><Glyphicon glyph="earphone" /> {this.props.verbiage.company_phone || 'company_phone'}</p>
          <Nav pullRight>
            <LinkContainer to="/home"><NavItem><Glyphicon glyph="home" />&nbsp;&nbsp;&nbsp;How It Works</NavItem></LinkContainer>
            <LinkContainer to="/add-stuff"><NavItem>Store Stuff</NavItem></LinkContainer>
            <LinkContainer to="/pricing"><NavItem>Pricing</NavItem></LinkContainer>
            <LinkContainer to="/faqs"><NavItem>FAQs</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

HeaderNav.propTypes = {
  signOut: PropTypes.func.isRequired,
  verbiage: PropTypes.object.isRequired,
  showSignIn: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  cartTotals: PropTypes.object.isRequired,
  userSignedIn: PropTypes.bool
};

export default HeaderNav;
