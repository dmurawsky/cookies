import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import * as cartActions from './cartActions';
import * as userActions from '../user/userActions';
import Product from './Product';
import { Grid, Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import Equalizer from 'react-equalizer';

class AddStuffPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.updateZip = this.updateZip.bind(this);
    this.checkZip = this.checkZip.bind(this);
    this.props.actions.cart.loadProducts(this.props.zip);
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

  render(){
    if (this.props.products.length>0){
      return (
        <Grid>
          <Row style={{margin:"40px 0 50px"}}>
            <Col xs={12}>
              <p id="addStuffTitle">Our Plans</p>
              <p id="addStuffSubtitle">Pickup is <span className="seBlue">Free</span>, Delivery is <span className="seBlue">${this.props.settings.pickUpPrice}.00</span></p>
            </Col>
          </Row>
          <Row>
            <Equalizer byRow={false}>
              {this.props.products.map(product=>{
                return (
                  <Product
                    key={product._id}
                    photoRoot={this.props.settings.photoRoot}
                    incrementQty={this.props.actions.cart.incrementQty}
                    decrementQty={this.props.actions.cart.decrementQty}
                    details={product} />
                );
              })}
            </Equalizer>
          </Row>
          <Row>
            <Col sm={4}/>
            <Col sm={4}>
              {!this.props.userSignedIn && <LinkContainer to="/signup"><Button style={{marginTop:"100px",height:"100px"}} onClick={this.closeCart} className="btn-primary btn-block btn-lg">Checkout</Button></LinkContainer>}
              {this.props.userSignedIn && <LinkContainer to="/appointment"><Button style={{marginTop:"100px",height:"60px",padding:"16px",textTransform:"uppercase", fontSize:"20px"}} onClick={this.closeCart} className="btn-primary btn-block btn-lg">Checkout</Button></LinkContainer>}
            </Col>
          </Row>
        </Grid>
      );
    }else{
      return (
        <Grid>
          <Form onSubmit={this.checkZip}>
            <Row>
              <h3 className="text-center">Enter your zip code to get started:</h3>
              <Col sm={4}/>
              <Col sm={3}>
                <FormControl value={this.props.zip} onChange={this.updateZip} />
              </Col>
              <Col sm={1}>
                <Button type="submit" className="btn-primary btn-block">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Grid>
      );
    }
  }
}

AddStuffPage.propTypes = {
  products: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  zip: PropTypes.string,
  userSignedIn: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

export default connect(
  s=>{return {products:s.cart.products,settings:s.settings,zip:s.user.zip,userSignedIn:s.user.userSignedIn};}, // in lieu of mapStateToProps
  d=>{return {actions:{user:bindActionCreators(userActions,d),cart:bindActionCreators(cartActions,d)}};} // in lieu of mapDispatchToProps
)(AddStuffPage);
