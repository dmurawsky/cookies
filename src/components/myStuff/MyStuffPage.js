import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import Stuff from './Stuff';
import {bindActionCreators} from 'redux';
import * as actions from './myStuffActions';
import Equalizer from 'react-equalizer';
import EditStuffModal from './EditStuffModal';

class MyStuffPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.showEditStuffModal = this.showEditStuffModal.bind(this);
    this.requestPickup = this.requestPickup.bind(this);
    this.viewAppointment = this.viewAppointment.bind(this);
    this.requestDelivery = this.requestDelivery.bind(this);
  }

  showEditStuffModal(e){
    const arr = e.target.id.split('_');
    const item = this.props.myStuff[arr[0]].find(item=>item._id==arr[1]);
    this.props.actions.showEditStuffModal(item);
    this.props.actions.loadItemPhotos(arr[1]);
  }

  requestPickup(e){
    this.props.actions.requestPickup(e.target.id);
  }

  viewAppointment(e){
    this.props.actions.navAppointment(e.target.id);
  }

  requestDelivery(e){
    this.props.actions.requestDelivery(e.target.id);
  }

  render(){
    return (
      <Grid>
        {this.props.myStuff.customer.length>0 && <div className="well">
          <h3>With You</h3>
          <Row>
            <Equalizer>
              {this.props.myStuff.customer.length>0 && this.props.myStuff.customer.map(item=>{
                return (
                  <Stuff key={item._id}
                    item={item}
                    statusIndex="customer"
                    btnText={{request:"Request Pickup",cancel:"Cancel Pickup"}}
                    onClick={this.requestPickup}
                    btnBool={!item.pickup}
                    showEditStuffModal={this.showEditStuffModal}  />
                );
              })}
            </Equalizer>
          </Row>
        </div>}
        {this.props.myStuff.pickup.length>0 && <div className="well">
          <h3>Pickup Scheduled</h3>
          <Row>
            <Equalizer>
              {this.props.myStuff.pickup.length>0 && this.props.myStuff.pickup.map(item=>{
                return (
                  <Stuff key={item._id}
                    item={item}
                    statusIndex="pickup"
                    btnText={{cancel:"View Appointment"}}
                    onClick={this.viewAppointment}
                    showEditStuffModal={this.showEditStuffModal}  />
                );
              })}
            </Equalizer>
          </Row>
        </div>}
        {this.props.myStuff.stored.length>0 && <div className="well">
          <h3>Stored</h3>
          <Row>
            <Equalizer>
              {this.props.myStuff.stored.length>0 && this.props.myStuff.stored.map(item=>{
                return (
                  <Stuff key={item._id}
                    item={item}
                    statusIndex="stored"
                    btnText={{request:"Request Delivery",cancel:"Cancel Delivery"}}
                    onClick={this.requestDelivery}
                    btnBool={!item.delivery}
                    showEditStuffModal={this.showEditStuffModal}  />
                );
              })}
            </Equalizer>
          </Row>
        </div>}
        {this.props.myStuff.delivery.length>0 && <div className="well">
          <h3>Delivery Scheduled</h3>
          <Row>
            <Equalizer>
              {this.props.myStuff.delivery.length>0 && this.props.myStuff.delivery.map(item=>{
                return (
                  <Stuff key={item._id}
                    item={item}
                    statusIndex="delivery"
                    btnText={{cancel:"View Appointment"}}
                    onClick={this.viewAppointment}
                    showEditStuffModal={this.showEditStuffModal}  />
                );
              })}
            </Equalizer>
          </Row>
        </div>}
        <EditStuffModal />
      </Grid>
    );
  }
}

MyStuffPage.propTypes = {
  actions: PropTypes.object.isRequired,
  myStuff: PropTypes.object.isRequired,
  id: PropTypes.string
};

export default connect(
  s=>{return {
    myStuff:s.myStuff,
    id:s.user._id
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(MyStuffPage);
