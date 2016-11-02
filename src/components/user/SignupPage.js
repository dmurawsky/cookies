import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from '../user/userActions';
import states from '../../utils/states';
import FieldGroup from '../FieldGroup';

class SignupPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.updateCard = this.updateCard.bind(this);
    this.updateSignup = this.updateSignup.bind(this);
    this.createUser = this.createUser.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.afterStripe = this.afterStripe.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillUpdate(nextProps){
    if(nextProps.userSignedIn)
      this.props.actions.navAppointment();
  }

  updateCard(e){
    const card = this.props.card;
    const field = e.target.name;
    const value = e.target.value;
    if (field == 'cardNumber' && value.length >= 16) this.expMonth.focus();
    if (field == 'expMonth' && value.length >= 2) this.expYear.focus();
    if (field == 'expYear' && value.length >= 2) this.cvc.focus();
    card[field] = value;
    return this.setState({card});
  }

  updateSignup(e){
    const field = e.target.name;
    let user = this.props.user;
    user[field] = e.target.value;
    return this.setState({user});
  }

  createUser(e){
    e.preventDefault();
    if (this.props.user.password === this.props.user.confirm){
      this.props.user.passwordError = false;
      const user = this.props.user;
      this.props.actions.createUser(user);
    }else{
      alert('Your password and confirmation do not match.');
    }
  }

  afterStripe(status, response) {
    const user = this.props.user;
    this.props.actions.createUser(user, response);
  }

  saveToken(e){
    e.preventDefault();
    Stripe.card.createToken(e.target, this.afterStripe); // eslint-disable-line
  }

  showSignIn(e){
    e.preventDefault();
    this.props.actions.showSignIn();
  }

  render(){
    return (
      <Row>
        <Col sm={4}/>
        <Col sm={4}>
          <h2>Create Your Account</h2><hr/>
          <p>Already signed up? <a onClick={this.showSignIn}>Login</a></p>
          <Form onSubmit={this.saveToken} style={{marginBottom:"45px"}}>
            <FieldGroup
              required
              id="signupFirst"
              label="First Name"
              name="firstName"
              value={this.props.user.firstName}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupLast"
              name="lastName"
              label="Last Name"
              value={this.props.user.lastName}
              onChange={this.updateSignup}
            />
            <FieldGroup
              id="signupCompany"
              name="company"
              label="Company"
              value={this.props.user.company}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupEmail"
              type="email"
              name="email"
              label="Email"
              value={this.props.user.email}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupPassword"
              type="password"
              name="password"
              label="Password"
              value={this.props.user.password}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupConfirm"
              type="password"
              name="confirm"
              label="Confirm Password"
              value={this.props.user.confirm}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupPhone"
              name="phone"
              label="Phone"
              value={this.props.user.phone}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupAddress"
              name="address1"
              label="Address"
              value={this.props.user.address1}
              onChange={this.updateSignup}
            />
            <FieldGroup
              id="signupAddress2"
              name="address2"
              label="Address 2"
              value={this.props.user.address2}
              onChange={this.updateSignup}
            />
            <FieldGroup
              required
              id="signupCity"
              name="city"
              label="City"
              value={this.props.user.city}
              onChange={this.updateSignup}
            />
            <FormGroup controlId="signupState">
              <ControlLabel>State</ControlLabel>
              <FormControl componentClass="select" value={this.props.user.country} onChange={this.updateSignup}>
                {this.props.states && this.props.states.map(state=>{
                  return <option key={state}>{state}</option>;
                })}
              </FormControl>
            </FormGroup>
            <FieldGroup
              required
              id="signupZip"
              name="zip"
              label="Zip"
              value={this.props.user.zip}
              onChange={this.updateSignup}
            />
            <hr/>
            <h4>Payment Info:</h4>
            <FormGroup>
              <ControlLabel>Credit Card Number</ControlLabel>
              <input type="text" className="form-control" placeholder="Card Number" name="cardNumber" maxLength="16" required data-stripe="number" value={this.props.card.cardNumber} onChange={this.updateCard} />
            </FormGroup>
            <Row style={{marginBottom:"20px"}}>
              <Col sm={8}>
                <FormGroup>
                  <ControlLabel>Expiration Date</ControlLabel><br/>
                  <input type="text" name="expMonth" ref={(input) => this.expMonth = input} style={{width:"50px",display:"inline"}} className="form-control" required maxLength="2" placeholder="MM" data-stripe="exp_month" value={this.props.card.expMonth} onChange={this.updateCard} />&nbsp;/
                  &nbsp;<input type="text" className="form-control" name="expYear" ref={(input) => this.expYear = input} style={{width:"50px",display:"inline"}} maxLength="2" placeholder="YY" data-stripe="exp_year" value={this.props.card.expYear} onChange={this.updateCard} />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <ControlLabel>CV Code</ControlLabel>
                  <input type="text" className="form-control" name="cvc" ref={(input) => this.cvc = input} required maxLength="4" placeholder="CVC" data-stripe="cvc" value={this.props.card.cvc} onChange={this.updateCard} />
                </FormGroup>
              </Col>
            </Row>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Next</button>
          </Form>
        </Col>
      </Row>
    );
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
  userSignedIn: PropTypes.bool,
  user: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
};

export default connect(
  (s)=>{return {
    user:{
      firstName:"",
      lastName:"",
      email:"",
      phone:"",
      emailError:false,
      password:"",
      confirm:"",
      passwordError:false,
      address1:"",
      address2:"",
      city:"",
      state:"FL",
      zip:"",
      company:""
    },
    card:{
      cardNumber:"4242424242424242",
      expMonth:"",
      expYear:"",
      cvc:"123",
    },
    states:states,
    userSignedIn:s.user.userSignedIn
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(SignupPage);
