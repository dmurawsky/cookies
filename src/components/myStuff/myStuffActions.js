import * as types from '../../setup/actionTypes';
import {browserHistory} from 'react-router';
import Q from 'q';
import 'whatwg-fetch';

export function loadMyStuff(id) {
  return function(dispatch, getState, api) {
    return fetch(api+"customer/"+id)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.LOAD_MY_STUFF_SUCCESS,
        myStuff: json.data
      });
    });
  };
}

export function loadItemPhotos(itemId) {
  return function(dispatch, getState, api) {
    return fetch(api+"itemPhotos/"+itemId)
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.LOAD_ITEM_PHOTOS_SUCCESS,
        photos: json.data
      });
    });
  };
}

export function uploadPhoto(itemId, file){
  return function(dispatch, getState, api) {
    return fetch(api+"sign-s3?file-type="+file.type+"&file-name="+file.name+"&item-id="+itemId)
    .then(response => response.json())
    .then(json => {
      return fetch(json.signedRequest,{
        method:"PUT",
        headers: { "Content-type": file.type },
        body:file
      })
      .then(() => {
        dispatch(loadItemPhotos(itemId));
      });
    });
  };
}

export function updateItem(item) {
  return function(dispatch, getState, api) {
    return fetch(api+"updateItem/"+item._id, {
      method:"put",
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(item)
    })
    .then(()=>{
      dispatch(loadMyStuff(item.customer));
      dispatch({type: types.CLOSE_EDIT_STUFF_MODAL});
    });
  };
}

export function saveProduct(field, value) {
  const fieldObj = {};
  fieldObj[field] = value;
  return {
    type: types.EDIT_FIELD_CHANGE,
    fieldObj
  };
}

export function editFieldChange(field, value) {
  const fieldObj = {};
  fieldObj[field] = value;
  return {
    type: types.EDIT_FIELD_CHANGE,
    fieldObj
  };
}

export function showEditStuffModal(details) {
  return {
    type: types.SHOW_EDIT_STUFF_MODAL,
    details
  };
}

export function closeEditStuffModal() {
  return {
    type: types.CLOSE_EDIT_STUFF_MODAL
  };
}

export function requestPickup(itemId) {
  const arr = itemId.split('_');
  return {
    type: types.REQUEST_PICKUP,
    itemId: arr[1],
    statusIndex: arr[0]
  };
}

export function requestDelivery(itemId) {
  const arr = itemId.split('_');
  return {
    type: types.REQUEST_DELIVERY,
    itemId: arr[1],
    statusIndex: arr[0]
  };
}

export function navAppointment() {
  return function() {
    return Q.all([]).then(function(){
      browserHistory.push('/appointment');
    });
  };
}
