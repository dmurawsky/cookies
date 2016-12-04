import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import * as cartActions from './cartActions';
import * as userActions from '../user/userActions';
import Product from './Product';
import { Grid, Row, Col, Button, Form, FormControl } from 'react-bootstrap';

class AddStuffPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.updateZip = this.updateZip.bind(this);
    this.checkZip = this.checkZip.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.props.actions.cart.loadProducts(this.props.zip);
    window.Intercom('trackEvent', 'add-stuff-page');
  }

  updateZip(e){
    this.props.actions.user.updateZip(e.target.value);
  }

  checkZip(e){
    e.preventDefault();
    if (this.props.zip.length >= 5 && /^\d+$/.test(this.props.zip)){
      this.props.actions.cart.loadProducts(this.props.zip);
    }else{
      alert("You've entered an invalid zip code. Please enter a 5 digit zip code.");
    }
  }

  updateEmail(e){
    this.props.actions.user.updateEmail(e.target.value);
  }

  saveEmail(e){
    e.preventDefault();
    window.Intercom('trackEvent', 'saved-email', { email: this.props.email });
    this.props.actions.cart.emailThankYou();
  }

  render(){
    if (this.props.cart.products.length>0){
      return (
        <Grid>
          <Row style={{margin:"40px 0 50px"}}>
            <Col xs={12}>
              <p id="addStuffTitle">Our Plans</p>
              <p id="addStuffSubtitle">Pickup is <span className="seBlue">Free</span>, Delivery is <span className="seBlue">${this.props.settings.pickUpPrice}.00</span></p>
            </Col>
          </Row>
          <Row>
            {this.props.cart.products.map(product=>{
              return (
                <Product
                  key={product._id}
                  prodPhotoRoot={this.props.settings.prodPhotoRoot}
                  incrementQty={this.props.actions.cart.incrementQty}
                  decrementQty={this.props.actions.cart.decrementQty}
                  details={product} />
              );
            })}
          </Row>
          <Row>
            <Col sm={4}/>
            <Col sm={4}>
              {!this.props.userSignedIn && <LinkContainer to="/signup"><Button onClick={this.closeCart} className="checkoutBtnStuff btn-primary btn-block btn-lg">Checkout</Button></LinkContainer>}
              {this.props.userSignedIn && <LinkContainer to="/appointment"><Button onClick={this.closeCart} className="checkoutBtnStuff btn-primary btn-block btn-lg">Checkout</Button></LinkContainer>}
            </Col>
          </Row>
        </Grid>
      );
    }else{
      return (
        <Grid>
          {!this.props.cart.showEmailField && <Form onSubmit={this.checkZip}>
            <Row>
              <h3 className="text-center">Enter your zip code to get started:</h3>
              <Col sm={4}/>
              <Col sm={4}>
                <br/>
                <FormControl value={this.props.zip} onChange={this.updateZip} placeholder="Enter Your Zip Code" />
                <br/>
                <Button type="submit" className="btn-primary btn-block">Submit</Button>
              </Col>
            </Row>
          </Form>}
          {this.props.cart.showEmailField && !this.props.cart.emailThankYou && <Form onSubmit={this.saveEmail}>
            <Row>
              <h3 className="text-center">Enter your email to be notified when we offer service in your area:</h3>
              <Col sm={4}/>
              <Col sm={4}>
                <br/>
                <FormControl value={this.props.email} onChange={this.updateEmail} placeholder="Enter Your Email" />
                <br/>
                <Button type="submit" className="btn-primary btn-block">Submit</Button>
              </Col>
            </Row>
          </Form>}
          {this.props.cart.emailThankYou && <h3 className="text-center">Thank you! We'll email you if our service becomes available in your area.</h3>}
        </Grid>
      );
    }
  }
}

AddStuffPage.propTypes = {
  cart: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  zip: PropTypes.string,
  userSignedIn: PropTypes.bool,
  email: PropTypes.string,
  actions: PropTypes.object.isRequired
};

export default connect(
  s=>{return {
    cart:s.cart,
    settings:s.settings,
    zip:s.user.zip,
    userSignedIn:s.user.userSignedIn,
    email:s.user.email || ""
  };}, // in lieu of mapStateToProps
  d=>{return {actions:{user:bindActionCreators(userActions,d),cart:bindActionCreators(cartActions,d)}};} // in lieu of mapDispatchToProps
)(AddStuffPage);
