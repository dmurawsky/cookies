import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SESlider from './SESlider';
import ZipChecker from './ZipChecker';
import * as actions from '../user/userActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateZip = this.updateZip.bind(this);
    this.submitZip = this.submitZip.bind(this);
  }

  updateZip(e){
    this.props.actions.updateZip(e.target.value);
  }

  submitZip(e){
    console.log(e);
  }

  render(){
    const sliderAttrs = {
      imagePlaceholder:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      photoRoot: this.props.photoRoot,
      verbiage: this.props.verbiage,
      photos: [this.props.verbiage['home_slide_image_1'],this.props.verbiage['home_slide_image_2'],this.props.verbiage['home_slide_image_3']],
      text: [this.props.verbiage['home_slide_text_1'],this.props.verbiage['home_slide_text_2'],this.props.verbiage['home_slide_text_3']],
      slideClass: 'home_slide',
      sliderSettings: {
        swipe: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
      }
    };

    return (
      <div>
        <div id="home_slider_wrapper">
          <SESlider {...sliderAttrs} />
          <ZipChecker zip={this.props.zip} updateZip={this.updateZip} submitZip={this.submitZip} verbiage={this.props.verbiage} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  photoRoot: PropTypes.string.isRequired,
  verbiage: PropTypes.object.isRequired,
  zip: PropTypes.string.isRequired
};

export default connect(
  s=>{return { zip:s.user.zip, verbiage:s.content.verbiage, photoRoot:s.settings.photoRoot || 'https://s3-us-west-2.amazonaws.com/stowedge/' };}, // in lieu of mapStateToProps
  d=>{return {actions:bindActionCreators(actions,d)};} // in lieu of mapDispatchToProps
)(HomePage);
