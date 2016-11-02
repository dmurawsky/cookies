import React, {PropTypes} from 'react';
import { Col, Glyphicon } from 'react-bootstrap';

class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
  }

  incrementQty(e) {
    e.preventDefault();
    this.props.incrementQty(this.props.details._id);
  }

  decrementQty(e){
    e.preventDefault();
    this.props.decrementQty(this.props.details._id);
  }

  getMinimum(){
    if(this.props.details.minimum>0)
      return <small><em>{this.props.details.minimum} month minimum term</em></small>;
    else
      return <small><em>no minimum term</em></small>;
  }

  render() {
    const details = this.props.details;
    return (
      <Col lg={2} md={3} sm={4} xs={6}>
        <div className="product">
          <div>
            <div className="productTitle">{details.title}</div>
            <div className="productPrice">${details.price} /mo</div>
            <div>{this.getMinimum()}</div>
          </div>
          <div>
            <img style={{maxWidth:"100%",width:"100%"}} src={this.props.photoRoot+details.photoUrl} />
          </div>
          {this.props.decrementQty && this.props.incrementQty && <div className="qtyBg"/>}
          {this.props.decrementQty && this.props.incrementQty && <div className="qtyBtns text-center">
            <Glyphicon onClick={this.decrementQty} glyph="minus" />
            <span style={{margin:"15px",fontSize:"18px"}}>{details.qty}</span>
            <Glyphicon onClick={this.incrementQty} glyph="plus" />
          </div>}
        </div>
      </Col>
    );
  }
}

Product.propTypes = {
  photoRoot: PropTypes.string,
  details: PropTypes.object.isRequired,
  incrementQty: PropTypes.func,
  decrementQty: PropTypes.func
};

export default Product;
