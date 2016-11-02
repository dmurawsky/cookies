import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './userActions';
import FieldGroup from '../FieldGroup';

class SignInModal extends React.Component {
  constructor(props, context){
    super(props, context);
    this.updateSignIn = this.updateSignIn.bind(this);
    this.closeSignIn = this.closeSignIn.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  closeSignIn(){
    this.props.actions.closeSignIn();
  }

  updateSignIn(e){
    const field = e.target.name;
    let signin = this.props.signin;
    signin[field] = e.target.value;
    return this.setState({signin});
  }

  signIn(e){
    e.preventDefault();
    const signin = this.props.signin;
    this.props.actions.signIn(signin);
  }

  render() {
    return (
      <Modal size={"sm"} show={this.props.user.showSignIn} onHide={this.closeSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.signIn}>
            <FieldGroup
              id="signInEmail"
              name="email"
              type="email"
              label="Email"
              value={this.props.signin.email}
              onChange={this.updateSignIn}
            />
            <FieldGroup
              id="signInPassword"
              type="password"
              name="password"
              label="Password"
              value={this.props.signin.password}
              onChange={this.updateSignIn}
            />
            <p className="text-danger">{this.props.user.signInError}</p>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signin: PropTypes.object.isRequired
};

export default connect(
  s=>{return {
    user:s.user,
    signin:{email:"",password:""}
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(SignInModal);
