import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './contentActions';

class FaqPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.props.actions.getFaqs();
  }

  render(){
    return (
      <Grid>
        <Row style={{margin:"40px 0 50px"}}>
          <Col xs={12}>
            <p id="addStuffTitle">FAQs</p>
            <p id="addStuffSubtitle">Our most frequently asked questions.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>
              {this.props.faqcats.length>0 && this.props.faqcats.map(faqcat=>{
                if (this.props.params.category && this.props.params.category===faqcat._id)
                  return <span className="categoryLink" key={faqcat._id} to={"/faqs/"+faqcat._id}>{faqcat.title}</span>;
                else
                  return <Link className="categoryLink" key={faqcat._id} to={"/faqs/"+faqcat._id}>{faqcat.title}</Link>;
              })}
              {this.props.params.category && <Link className="categoryLink" to={"/faqs"}>All</Link>}
            </h4>
          </Col>
        </Row>
        {this.props.faqs.length>0 && this.props.faqs.map(faq=>{
          if (!this.props.params.category || this.props.params.category === faq.category){
            return (
              <Row key={faq._id}>
                <Col xs={12}>
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          }
        })}
      </Grid>
    );
  }
}

FaqPage.propTypes = {
  actions: PropTypes.object.isRequired,
  faqs: PropTypes.array.isRequired,
  faqcats: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
};

export default connect(
  s=>{return {
    faqs:s.content.faqs,
    faqcats:s.content.faqcats
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(FaqPage);
