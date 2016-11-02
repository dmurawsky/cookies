import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './checkoutActions';
import {getCartTotals} from '../../setup';
import NumberFormatter from '../../utils/numberFormatter';

class CheckoutPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.checkout = this.checkout.bind(this);
  }

  checkout(){
    this.props.actions.checkout();
  }

  render(){
    return (
      <Grid>
        <h3>Review Your Subscription</h3>
        <Row>
          <Col md={6}>
            <div className="well">
              <p>On Card:</p>
              <h4>XXXX-XXXX-XXXX-{this.props.user.lastFour}</h4>
              <p>At Address:</p>
              <h4>
                {this.props.user.address1}<br/>
                {this.props.user.address2}<br/>
                {this.props.user.city}, {this.props.user.state} {this.props.user.zip}
              </h4>
            </div>
          </Col>
          <Col md={6}>
            <div className="well">
              {this.props.cartTotals.qty > 0 && <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Qty</th>
                    <th className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.cart.products.map(product=>{
                    if(product.qty>0){
                      return (
                        <tr key={product._id+"_reviewRow"}>
                          <td>{product.title}</td>
                          <td className="text-right">{NumberFormatter.getCurrencyFormattedNumber(product.price)}</td>
                          <td className="text-right">{product.qty}</td>
                          <td className="text-right">{NumberFormatter.getCurrencyFormattedNumber(product.qty * product.price)}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3} className="text-right">TOTAL</th>
                    <th className="text-right">{NumberFormatter.getCurrencyFormattedNumber(this.props.cartTotals.price)}</th>
                  </tr>
                </tfoot>
              </table>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3}/>
          <Col md={6}>
            <button onClick={this.checkout} className="btn btn-primary btn-lg btn-block">Submit Order</button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CheckoutPage.propTypes = {
  actions: PropTypes.object.isRequired,
  cartTotals: PropTypes.object.isRequired,
  myStuff: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

export default connect(
  s=>{return {user:s.user,cart:s.cart,myStuff:s.myStuff,cartTotals:getCartTotals(s)};},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(CheckoutPage);
