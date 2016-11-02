import React, {PropTypes} from 'react';
import { Modal, Button, Glyphicon, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {deliveryFee} from '../../utils/dateHelper';

class Cart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.closeCart = this.closeCart.bind(this);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
  }

  closeCart(){
    this.props.closeCart();
  }

  incrementQty(e){
    e.preventDefault();
    this.props.incrementQty(e.target.id);
  }

  decrementQty(e){
    e.preventDefault();
    this.props.decrementQty(e.target.id);
  }

  render() {
    return (
      <Modal show={this.props.showCart} onHide={this.closeCart}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.products && this.props.products.map(product=>{
            if(product.qty>0){
              return (
                <Row key={product._id} style={{marginBottom:"8px"}}>
                  <Col xs={4}>
                    <img style={{maxWidth:"100%",width:"60px",float:"left"}} src={this.props.settings.photoRoot+product.photoUrl} />
                    <p style={{marginTop:"10px"}}>{product.title}</p>
                  </Col>
                  <Col xs={4} className="text-center">
                    <p style={{marginTop:"6px"}}>
                      <Glyphicon id={product._id} onClick={this.decrementQty} glyph="minus" />
                      <span style={{margin:"15px",fontSize:"16px"}}>{product.qty}</span>
                      <Glyphicon id={product._id} onClick={this.incrementQty} glyph="plus" />
                    </p>
                  </Col>
                  <Col xs={4}>
                    <p style={{marginTop:"6px"}}>
                      <span className="pull-right">${product.subtotal}/mo</span>
                    </p>
                  </Col>
                </Row>
              );
            }
          })}
          {this.props.cartTotals.newItemsQty>0 && (this.props.cartTotals.pickupQty>0 || this.props.cartTotals.deliveryQty>0) && <hr/>}
          <Row>
            <Col sm={6}>
              {this.props.cartTotals.pickupQty>0 && <strong>{this.props.cartTotals.pickupQty} Pickup Requests:</strong>}
              {this.props.cartTotals.pickupQty>0 && this.props.myStuff.customer.map(item=>{
                if(item.pickup){
                  return (
                    <Row key={item._id}>
                      <Col xs={12}>{item.product.title}</Col>
                    </Row>
                  );
                }
              })}
            </Col>
            <Col sm={6}>
              {this.props.cartTotals.deliveryQty>0 && <strong>{this.props.cartTotals.deliveryQty} Delivery Requests:</strong>}
              {this.props.cartTotals.deliveryQty>0 && this.props.myStuff.stored.map(item=>{
                if(item.delivery){
                  return (
                    <Row key={item._id}>
                      <Col xs={12}>{item.product.title}</Col>
                    </Row>
                  );
                }
              })}
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col xs={7}/>
            <Col xs={5}>
              <table className="table">
                <tbody>
                  {/*<tr><th style={{borderTop:'none'}}>Total Qty</th><td style={{borderTop:'none'}}><span className="pull-right">{this.props.cartTotals.qty}</span></td></tr>*/}
                  {this.props.cartTotals.deliveryQty>0 && <tr><th style={{borderTop:'none'}}>Delivery Fee</th><td style={{borderTop:'none'}}><span className="pull-right">${deliveryFee(this.props.user.apptDate, this.props.settings)}</span></td></tr>}
                  {this.props.cartTotals.qty>0 && <tr><th style={{borderTop:'none'}}>Monthly Total</th><td style={{borderTop:'none'}}><span className="pull-right">${this.props.cartTotals.price}/mo</span></td></tr>}
                  {/*this.props.cartTotals.qty>0 && this.props.cartTotals.deliveryQty>0 && <tr><th>Checkout Total</th><td><span className="pull-right">${this.props.cartTotals.price+Number(deliveryFee(this.props.user.apptDate, this.props.settings))}</span></td></tr>*/}
                  <tr>
                    <td colSpan="2" style={{borderTop:'none'}}>
                      {!this.props.userSignedIn && <LinkContainer to="/signup"><Button onClick={this.closeCart} className="btn-primary btn-block">Checkout</Button></LinkContainer>}
                      {this.props.userSignedIn && <LinkContainer to="/appointment"><Button onClick={this.closeCart} className="btn-primary btn-block">Checkout</Button></LinkContainer>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  myStuff: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  showCart: PropTypes.bool,
  closeCart: PropTypes.func.isRequired,
  incrementQty: PropTypes.func.isRequired,
  decrementQty: PropTypes.func.isRequired,
  cartTotals: PropTypes.object.isRequired,
  userSignedIn: PropTypes.bool
};

export default Cart;
