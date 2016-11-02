import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
// import ReactS3Uploader from 'react-s3-uploader';

const Stuff = (props) => {
  return (
    <Col sm={3} style={{marginBottom:"20px"}}>
      <div className="myStuffItem panel panel-default">
        <div className="panel-body">
          <img style={{width:'100px',float:'left'}} src={"https://s3-us-west-2.amazonaws.com/stowedge/prod/large/"+props.item.product.photoUrl}/>
          <div>
            <p>{props.item.product.title}<br/>${props.item.product.price}/mo <br/><small>{props.item.barcode}</small></p>
            <button id={props.statusIndex+"_"+props.item._id} className={"btn btn-block "+(props.btnBool?'btn-primary':'btn-default')} onClick={props.onClick}>{props.btnBool?props.btnText.request:props.btnText.cancel}</button>
          </div>
        </div>
        <div className={"itemNotesBtn"+(props.item.open?" open":"")} id={props.statusIndex+"_"+props.item._id} onClick={props.showEditStuffModal}>
          {props.item.description?props.item.description:"Add Description"}
        </div>
      </div>
    </Col>
  );
};

Stuff.propTypes = {
  item: PropTypes.object.isRequired,
  btnText: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  showEditStuffModal: PropTypes.func.isRequired,
  statusIndex: PropTypes.string.isRequired,
  photoRoot: PropTypes.string,
  userPhotoRoot: PropTypes.string,
  btnBool: PropTypes.bool
};

export default Stuff;
