import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import HowItWorks from './HowItWorks'; <Grid><HowItWorks /></Grid>
import ProductList from '../user/ProductList';
import * as actions from '../user/userActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {phone: ''};
    this._changeHandler = this._changeHandler.bind(this);
    this._updatePhone = this._updatePhone.bind(this);
  }

  _changeHandler(e){
    this.setState({phone:e.target.value});
  }

  _updatePhone(){
    if(this.state.phone.length >= 7)
      this.props.actions.updatePhone(this.state.phone);
    else
      alert('Phone number is too short');
  }

  render(){
    return (
      <div>
        <div id="storage-plans-bg">
          {this.props.settings.products && <ProductList products={this.props.settings.products} userProducts={this.props.user.cart || []} updateQty={this.props.actions.updateQty} />}
        </div>
        <div id="phoneInput">
          <input className="form-control input-lg" value={this.state.phone} onChange={this._changeHandler} />
          <button type="button" onClick={this._updatePhone} className="btn btn-default btn-lg btn-block">Place Order</button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  settings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  s=>{return { settings: s.settings, user: s.user };}, // in lieu of mapStateToProps
  d=>{return { actions: bindActionCreators(actions,d) };} // in lieu of mapDispatchToProps
)(HomePage);
