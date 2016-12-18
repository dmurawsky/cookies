import React, {PropTypes} from 'react';
import { Row } from 'react-bootstrap';
import Product from './Product';

const ProductList = (props) => {
  return (
    <div className="container">
      <h2 className="home-section-title">Load Up!</h2>
      <p className="storage-plans-subtitle text-center">Delivery is <span className="se-base-text">FREE</span>! Tipping keeps it that way ;)</p>
      <Row>
        {props.products.length>0 && props.products.map((product, i)=><Product key={"product_"+i} ind={i} details={product} qty={props.userProducts[i] || 0} updateQty={props.updateQty} />)}
      </Row>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  userProducts: PropTypes.array.isRequired,
  updateQty: PropTypes.func.isRequired
};

export default ProductList;
