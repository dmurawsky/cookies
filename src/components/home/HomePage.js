import React from 'react';
import {Link} from 'react-router';
import { Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      <Row id="homeTopRow">
        <Col xs={9}>
          <p className="homeTopText">
            Storage without the hassle of hauling.<br/>We pickup and deliver your stuff.<br/>
          <Link style={{margin:"30px"}} to="/add-stuff" className="btn btn-primary btn-lg">Start Packing</Link>
          </p>
        </Col>
      </Row>
      <div id="howItWorks">
        <p id="howItWorksText">How It Works</p>
        <img style={{margin:"0 auto",display:"block",width:"80%",maxWidth:"100%"}} src="https://s3-us-west-2.amazonaws.com/stowedge/howitworks.png"/>
      </div>
      <div style={{width:"560px", margin:"50px auto 0"}}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/D6eItTQ6G-U" frameBorder="0" allowFullScreen/>
      </div>
    </div>
  );
};

export default HomePage;
