import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from '../user/userActions';
import states from '../../utils/states';
import NumberFormatter from '../../utils/numberFormatter';
import objectAssign from 'object-assign';
import FieldGroup from '../FieldGroup';

class AccountPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.updateAccount = this.updateAccount.bind(this);
    this.afterStripe = this.afterStripe.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.updatePasses = this.updatePasses.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.props.actions.loadInvoices(this.props.user.stripeCustomerId);
    window.Intercom('trackEvent', 'account-page');
  }

  updateAccount(e){
    const field = e.target.name;
    let user = this.props.user;
    user[field] = e.target.value;
    return this.setState({user});
  }

  afterStripe(status, response) {
    const user = this.props.user;
    this.props.actions.updateCard({stripeCustomerId:user.stripeCustomerId, cardToken:response.id});
    return this.setState({card:{cardNumber:"", expMonth:"", expYear:"", cvc:""}});
  }

  saveToken(e){
    e.preventDefault();
    Stripe.card.createToken(e.target, this.afterStripe); // eslint-disable-line
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

  updatePasses(e){
    const field = e.target.name;
    const passes = this.props.passes;
    passes[field] = e.target.value;
    if(passes.mismatch && passes.password === passes.confirm) passes.mismatch = false;
    return this.setState({passes});
  }

  updatePassword(e){
    e.preventDefault();
    const passes = this.props.passes;
    if(passes.password === passes.confirm){
      this.props.actions.updatePassword(this.props.passes.password, this.props.user._id);
    }else{
      const passes = this.props.passes;
      passes.mismatch = true;
      return this.setState({passes});
    }
  }

  updateCustomer(e){
    e.preventDefault();
    const user = this.props.user;
    this.props.actions.updateCustomer(user);
  }

  render(){
    return (
      <Grid>
        <h2>
          Account Management
        </h2><hr/>
        <Row>
          <Col sm={7}>
            <h4>Account Info</h4>
            <div className="well">
              <Form onSubmit={this.updateCustomer} style={{marginBottom:"45px"}}>
                <Row>
                  <Col sm={6}>
                    <FieldGroup
                      id="signupFirst"
                      label="First Name"
                      name="firstName"
                      autoComplete="off"
                      value={this.props.user.firstName}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupLast"
                      name="lastName"
                      label="Last Name"
                      autoComplete="off"
                      value={this.props.user.lastName}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupCompany"
                      name="company"
                      label="Company"
                      autoComplete="off"
                      value={this.props.user.company}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupEmail"
                      type="email"
                      name="email"
                      label="Email"
                      autoComplete="off"
                      value={this.props.user.email}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupPhone"
                      name="phone"
                      label="Phone"
                      autoComplete="off"
                      value={this.props.user.phone}
                      onChange={this.updateAccount}
                    />
                  </Col>
                  <Col sm={6}>
                    <FieldGroup
                      id="signupAddress"
                      name="address1"
                      label="Address"
                      autoComplete="off"
                      value={this.props.user.address1}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupAddress2"
                      name="address2"
                      label="Address 2"
                      autoComplete="off"
                      value={this.props.user.address2}
                      onChange={this.updateAccount}
                    />
                    <FieldGroup
                      id="signupCity"
                      name="city"
                      label="City"
                      autoComplete="off"
                      value={this.props.user.city}
                      onChange={this.updateAccount}
                    />
                    <FormGroup controlId="signupState">
                      <ControlLabel>State</ControlLabel>
                      <FormControl autoComplete="off" componentClass="select" value={this.props.user.country} onChange={this.updateAccount}>
                        {this.props.states && this.props.states.map(state=>{
                          return <option key={state}>{state}</option>;
                        })}
                      </FormControl>
                    </FormGroup>
                    <FieldGroup
                      id="signupZip"
                      name="zip"
                      label="Zip"
                      autoComplete="off"
                      value={this.props.user.zip}
                      onChange={this.updateAccount}
                    />
                  </Col>
                </Row>
                <button type="submit" className="btn btn-primary btn-lg">Update Account</button>
              </Form>
            </div>
            <h4>Change Password</h4>
            <div className="well">
              <Form onSubmit={this.updatePassword} style={{marginBottom:"45px"}}>
                <FieldGroup
                  type="password"
                  id="newPassword"
                  name="password"
                  label="Password"
                  value={this.props.passes.password}
                  onChange={this.updatePasses}
                />
                <FieldGroup
                  type="password"
                  id="newConfirm"
                  name="confirm"
                  label="Confirm Password"
                  value={this.props.passes.confirm}
                  onChange={this.updatePasses}
                />
                {this.props.passes.mismatch && <p className="text-danger">Passwords must match</p>}
                <button type="submit" className="btn btn-primary btn-lg">Change Password</button>
              </Form>
            </div>
            <h4>Change Card</h4>
            <div className="well">
              <Form onSubmit={this.saveToken} style={{marginBottom:"45px"}}>
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
                <button type="submit" className="btn btn-primary btn-lg">Change Card</button>
              </Form>
            </div>
          </Col>
          <Col sm={1}/>
          <Col sm={4}>
            <h4>Invoices</h4>
            <div className="well">
              {this.props.user.invoices.length>0 && this.props.user.invoices.map(invoice=>{
                return (
                  <div key={invoice.id}>{invoice.id} - {NumberFormatter.getCurrencyFormattedNumber(invoice.total/100)}</div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AccountPage.propTypes = {
  actions: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  passes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
};

export default connect(
  (s)=>{
    const userObj = {
      firstName:"",
      lastName:"",
      email:"",
      phone:"",
      address1:"",
      address2:"",
      city:"",
      state:"",
      zip:"",
      company:""
    };
    return {
      user:objectAssign({},userObj, s.user),
      passes:{password:"",confirm:"",mismatch:false},
      states:states,
      card:{
        cardNumber:"",
        expMonth:"",
        expYear:"",
        cvc:"",
      }
    };
  },
  d=>{return {actions:bindActionCreators(actions,d)};}
)(AccountPage);
