import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';

const ApptBar = props => {
  if (props.user.userSignedIn && (moment().format('YYYY-MM-DD')==props.user.apptDate||moment().isBefore(props.user.apptDate))){
    return (
      <div id="apptBar">
        <Grid>
          <Row>
            <Col xs={12}>
              Next Appointment:&nbsp;
              <strong>{(moment().format('YYYY-MM-DD')==props.user.apptDate?'Today':moment(props.user.apptDate,'YYYY-MM-DD').format("dddd, MMM Do"))}</strong> &nbsp;&nbsp;
              From:&nbsp;
              <strong>{moment(props.user.apptTime,'H').format('h A')} - {moment(props.user.apptTime,'H').add(2,'h').format('h A')}</strong> &nbsp;&nbsp;
              <Link to="/appointment">Change</Link>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }else
    return null;
};

ApptBar.propTypes = {
  user: PropTypes.object.isRequired
};

export default ApptBar;
