import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Modal, Form, FormControl, FormGroup } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actions from './myStuffActions';
import Dropzone from 'react-dropzone';

class EditStuffModal extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onDrop = this.onDrop.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editFieldChange = this.editFieldChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }

  onDrop (files) {
    this.props.actions.uploadPhoto(this.props.details._id, files[0]);
    // console.log('Received files: ', files);
  }

  closeModal(){
    this.props.actions.closeEditStuffModal();
  }

  editFieldChange(e){
    this.props.actions.editFieldChange(e.target.name, e.target.value);
  }

  updateItem(e){
    e.preventDefault();
    this.props.actions.updateItem(this.props.details);
  }

  getPhotos(){
    return this.props.details.photos.map((photoUrl, i)=>{
      return (
        <div key={"photo_"+i} style={{padding:"20px"}}>
          <img src={this.props.prodPhotoRoot+photoUrl} style={{maxWidth:"100%"}} />
        </div>
      );
    });
  }

  render() {
    return (
      <Modal size={"sm"} show={this.props.details.show} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {!!this.props.details.product && this.props.details.product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.updateItem}>
            <FormGroup controlId="editDescription">
              <FormControl
                name="description"
                placeholder="Description"
                value={this.props.details.description}
                onChange={this.editFieldChange}
                />
            </FormGroup>
            <FormGroup controlId="editNotes">
              <FormControl
                componentClass="textarea"
                name="notes"
                placeholder="Notes"
                value={this.props.details.notes}
                onChange={this.editFieldChange}
               />
            </FormGroup>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Save</button>
          </Form><hr/>
          {this.getPhotos()}
          <Dropzone
            multiple={false}
            onDrop={this.onDrop}
            style={{color:"#CCC", fontWeight:"BOLD", width:"100%",height:"100px", border:"dashed 3px #ddd", borderRadius:"15px", margin:"15px auto", textAlign:"center", padding:"35px 0", fontSize:"18px"}}
            activeStyle={{color:"#AAA", border:"dashed 3px #BBB"}} >
            <div>CLICK OR DROP TO UPLOAD IMAGE</div>
          </Dropzone>
        </Modal.Body>
      </Modal>
    );
  }
}

EditStuffModal.propTypes = {
  actions: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  prodPhotoRoot: PropTypes.string
};

export default connect(
  s=>{return {
    details:s.myStuff.editStuffModal,
    prodPhotoRoot:s.settings.prodPhotoRoot || 'https://s3-us-west-2.amazonaws.com/stowedge/prod/large'
  };},
  d=>{return {actions:bindActionCreators(actions,d)};}
)(EditStuffModal);
