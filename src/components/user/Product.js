import React, {PropTypes} from 'react';
import { Col, Glyphicon } from 'react-bootstrap';

class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
  }

  incrementQty() {
    this.props.updateQty(this.props.ind, (this.props.qty + 1));
  }

  decrementQty(){
    this.props.updateQty(this.props.ind, (this.props.qty<=1?0:this.props.qty-1));
  }

  render() {
    const details = this.props.details;
    return (
      <Col md={3} sm={4} xs={6}>
        <div className="product">
          <div>
            <img style={{maxWidth:"100%",width:"100%"}} src={details.icon} />
          </div>
          <div>
            <p className="product-title">{details.title}</p>
            <p className="product-price se-base-text">{details.price}</p>
          </div>
          <div className="qtyBg"/>
          <div className="qtyBtns text-center">
            <Glyphicon onClick={this.decrementQty} glyph="minus" style={{cursor:"pointer"}} />
            <span style={{margin:"15px",fontSize:"18px"}}>{this.props.qty}</span>
            <Glyphicon onClick={this.incrementQty} glyph="plus" style={{cursor:"pointer"}} />
          </div>
        </div>
      </Col>
    );
  }
}

Product.propTypes = {
  details: PropTypes.object.isRequired,
  ind: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  updateQty: PropTypes.func.isRequired
};

export default Product;
