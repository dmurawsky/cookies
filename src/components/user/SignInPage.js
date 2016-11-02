import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './userActions';
import FieldGroup from '../FieldGroup';

class SignInPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.updateSignIn = this.updateSignIn.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  updateSignIn(e){
    const field = e.target.name;
    let user = this.props.user;
    user[field] = e.target.value;
    return this.setState({user});
  }

  signIn(e){
    e.preventDefault();
    let user = this.props.user;
    this.props.actions.login(user);
  }

  render(){
    return (
      <Row>
        <Col md={4}/>
        <Col md={4}>
          <h2>Login</h2><hr/>
          <Form onSubmit={this.signIn} style={{marginBottom:"45px"}}>
            <FieldGroup
              id="signInEmail"
              name="email"
              type="email"
              label="Email"
              value={this.props.user.email}
              onChange={this.updateSignIn}
            />
            <FieldGroup
              id="signInPassword"
              type="password"
              name="password"
              label="Password"
              value={this.props.user.password}
              onChange={this.updateSignIn}
            />
            <hr/>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
          </Form>
        </Col>
      </Row>
    );
  }
}

SignInPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(
  ()=>{return {
    user:{email:"",password:""}
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(SignInPage);
