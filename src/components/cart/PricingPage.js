import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './cartActions';
import Product from './Product';
import { Grid, Row, Col } from 'react-bootstrap';

class PricingPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.props.actions.loadPricing();
    window.Intercom('trackEvent', 'pricing-page');
  }

  render(){
    return (
      <Grid>
        <Row style={{margin:"40px 0 50px"}}>
          <Col xs={12}>
            <p id="addStuffTitle">Our Plans</p>
            <p id="addStuffSubtitle">Pickup is <span className="seBlue">Free</span>, Delivery is <span className="seBlue">${this.props.settings.pickUpPrice}.00</span></p>
          </Col>
        </Row>
        <Row>
          {this.props.pricing.length>0 && this.props.pricing.map(product=>{
            return <Product key={product._id} prodPhotoRoot={this.props.settings.prodPhotoRoot} details={product} />;
          })}
        </Row>
      </Grid>
    );
  }
}

PricingPage.propTypes = {
  pricing: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  s=>{return {pricing:s.cart.pricing,settings:s.settings};}, // in lieu of mapStateToProps
  d=>{return {actions:bindActionCreators(actions,d)};} // in lieu of mapDispatchToProps
)(PricingPage);
