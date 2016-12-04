import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import {deliveryFee} from '../../utils/dateHelper';
import * as actions from './userActions';
import moment from 'moment';

let date = moment();
let minDate = moment(); 
let maxDate = moment().add(60,'d');

class AppointmentPage extends React.Component{
  constructor(props, context){
    super(props, context);
    // this.deliveryFee = this.deliveryFee.bind(this);
    this.createAppt = this.createAppt.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.printTimeRange = this.printTimeRange.bind(this);
    window.Intercom('trackEvent', 'appointment-page');
    date = moment(this.props.user.apptDate, 'YYYY-MM-DD');
  }

  printTimeRange(appt){
    let active = "";
    if(this.props.user.apptTime === appt)
      active = "active";
    return (
      <li key={appt} className={"list-group-item appt-item "+active} id={"time_"+appt} onClick={this.updateTime}>
        {moment(appt+":00", ["H:mm"]).format("h:mm A")+' - '+moment((appt+2)+":00", ["H:mm"]).format("h:mm A")}
      </li>
    );
  }

  updateDate(apptDate){
    date = apptDate;
    this.props.actions.updateDate(apptDate.format('YYYY-MM-DD'));
    return this.setState({apptDate});
  }

  updateTime(e){
    const id = Number(e.target.id.substring(5));
    this.props.actions.updateTime(id);
  }

  createAppt(e){
    e.preventDefault();
    this.props.actions.createAppt(deliveryFee(this.props.user.apptDate, this.props.settings));
  }

  render(){
    return (
      <Row>
        <Col md={2}/>
        <Col md={8}>
          <h2>
            Schedule An Appointment
            <button className="btn btn-primary pull-right" onClick={this.createAppt}>Schedule Appointment</button>
          </h2><hr/>
          <Row>
            <Col md={6}>
              <DatePicker inline
                selected={date}
                onChange={this.updateDate}
                minDate={minDate}
                maxDate={maxDate} />
            </Col>
            <Col md={6}>
              <ul className="list-group">
                {this.props.appointments && this.props.appointments.map(this.printTimeRange)}
              </ul>
            </Col>
          </Row><hr/>
          <Row>
            <Col md={6}>
              {this.props.pickups.length>0 && <h4>To Be Picked Up</h4>}
              {this.props.pickups.length>0 && this.props.pickups.map(item=>{
                return (
                  <Col key={item._id} xs={12} style={{height:"120px",marginBottom:"5px"}}>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <img style={{width:'100px',float:'left'}} src={"https://s3-us-west-2.amazonaws.com/stowedge/prod/large/"+item.product.photoUrl}/>
                        <div>
                          <p>{item.product.title}<br/>${item.product.price}/mo <br/><small>{item.barcode}</small></p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Col>
            <Col md={6}>
              {this.props.deliveries.length>0 && <h4>To Be Delivered - <span className="text-primary">Delivery Fee: {"$"+deliveryFee(this.props.user.apptDate, this.props.settings)}</span></h4>}
              {this.props.deliveries.length>0 && this.props.deliveries.map(item=>{
                return (
                  <Col key={item._id} xs={12} style={{height:"120px",marginBottom:"5px"}}>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <img style={{width:'100px',float:'left'}} src={"https://s3-us-west-2.amazonaws.com/stowedge/prod/large/"+item.product.photoUrl}/>
                        <div>
                          <p>{item.product.title}<br/>${item.product.price}/mo <br/><small>{item.barcode}</small></p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

AppointmentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  appointments: PropTypes.array.isRequired,
  pickups: PropTypes.array,
  deliveries: PropTypes.array,
  settings: PropTypes.object.isRequired
};

export default connect(
  s=>{return {
    user:s.user,
    appointments:s.cart.appointments,
    pickups:s.myStuff.pickup,
    deliveries:s.myStuff.delivery,
    settings:s.settings
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(AppointmentPage);
