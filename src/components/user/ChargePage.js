import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Form, FormControl } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './userActions';

class ChargePage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.saveToken = this.saveToken.bind(this);
    this.afterStripe = this.afterStripe.bind(this);
    this.tempCharge = this.tempCharge.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillUpdate(nextProps){
    if(nextProps.user.stripeCustomerId)
      this.props.actions.navCheckout();
  }

  tempCharge(e) {
    e.preventDefault();
    this.props.actions.saveToken();
  }

  afterStripe(status, response) {
    this.props.actions.saveToken(response);
  }

  saveToken(e){
    e.preventDefault();
    Stripe.card.createToken(e.target, this.afterStripe); // eslint-disable-line
  }

  render(){
    return (
      <Row>
        <Col md={4}/>
        <Col md={4}>
          <h2>Payment Info</h2><hr/>
          <Form onSubmit={this.saveToken} style={{marginBottom:"45px"}}>
            <p><FormControl placeholder="Card Number" maxLength="20" data-stripe="number" value="4242424242424242" /></p>
            <p><FormControl style={{width:"50px",display:"inline"}} maxLength="2" placeholder="MM" data-stripe="exp_month" value="12" /> / <FormControl style={{width:"50px",display:"inline"}} maxLength="2" placeholder="YY" data-stripe="exp_year" value="22" /></p>
            <p><FormControl style={{width:"70px",display:"inline"}} maxLength="4" placeholder="CVC" data-stripe="cvc" value="123" /></p>
            <p><button className="btn btn-primary" type="submit">Submit</button></p>
          </Form>
        </Col>
      </Row>
    );
  }
}

ChargePage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  s=>{return {user:s.user};},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(ChargePage);
