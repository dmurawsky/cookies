import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import {Grid,Row,Col} from 'react-bootstrap';
import * as userActions from '../components/user/userActions';
import * as cartActions from '../components/cart/cartActions';
import {getCartTotals} from '../setup';
import Cart from '../components/cart/Cart';
import ApptBar from './ApptBar';
import SignInModal from '../components/user/SignInModal';
import HeaderNav from './HeaderNav';

const App = (props) => {
  return (
    <div>
      <div id="companyInfoHeader">
        Call Us: <a href="tel:+19415550000">(941) 555-0000</a> or <a href="mailto:hello@stowedge.com">hello@stowedge.com</a>
      </div>
      <HeaderNav
        showSignIn={props.actions.userActions.showSignIn}
        signOut={props.actions.userActions.signOut}
        userSignedIn={props.userSignedIn}
        openCart={props.actions.cartActions.open}
        cartTotals={props.cartTotals}
        />
      <ApptBar user={props.user} />
      <div id="content">{props.children}</div>
      <div id="subfooter">
        <Grid>
          <Row>
            <Col sm={3}>
              <h4>Company</h4>
              <p className="subfooterLink"><Link to="/faqs">Pricing</Link></p>
              <p className="subfooterLink"><Link to="/storage-terms">Storage Terms</Link></p>
              <p className="subfooterLink"><Link to="/website-terms">Website Terms</Link></p>
            </Col>
            <Col sm={3}>
              <h4>Support</h4>
              <p className="subfooterLink"><Link to="/faqs">FAQs</Link></p>
              {props.faqcats.map(faqcat=><p key={faqcat._id} className="subfooterLink category"><Link to={"/faqs/"+faqcat._id}>{faqcat.title}</Link></p>)}
            </Col>
            <Col sm={3}>
              <h4>Stay Connected</h4>
              <p>
                <i className="fa fa-facebook-square socialIcons"/>&nbsp;
                <i className="fa fa-twitter-square socialIcons"/>&nbsp;
                <i className="fa fa-google-plus-square socialIcons"/>
              </p>
              <p>(941) 555-0000</p>
              <p><a href="mailto:hello@stowedge.com">hello@stowedge.com</a></p>
            </Col>
            <Col sm={3}>
              <IndexLink to="/"><img src="https://s3-us-west-2.amazonaws.com/stowedge/logo-small.png"/> <small><sup>beta</sup></small></IndexLink>
            </Col>
          </Row>
        </Grid>
      </div>
      {!props.userSignedIn && <SignInModal />}
      <Cart
        closeCart={props.actions.cartActions.close}
        user={props.user}
        showCart={props.cart.showCart}
        incrementQty={props.actions.cartActions.incrementQty}
        decrementQty={props.actions.cartActions.decrementQty}
        products={props.cart.products}
        myStuff={props.myStuff}
        settings={props.settings}
        cartTotals={props.cartTotals}
        userSignedIn={props.userSignedIn}
        />
    </div>
  );
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  myStuff: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  cartTotals: PropTypes.object.isRequired,
  faqcats: PropTypes.array.isRequired,
  userSignedIn: PropTypes.bool,
  children: PropTypes.element
};

export default connect(
  s=>{return {
    userSignedIn:s.user.userSignedIn,
    cart:s.cart,
    settings:s.settings,
    user:s.user,
    myStuff:s.myStuff,
    faqcats:s.content.faqcats,
    cartTotals:getCartTotals(s)
  };}, // in lieu of mapStateToProps
  d=>{return {actions:{userActions:bindActionCreators(userActions,d),cartActions:bindActionCreators(cartActions,d)}};} // in lieu of mapDispatchToProps
)(App);
