import {LOAD_ITEM_PHOTOS_SUCCESS, CLOSE_EDIT_STUFF_MODAL, SHOW_EDIT_STUFF_MODAL, EDIT_FIELD_CHANGE, LOAD_MY_STUFF_SUCCESS, SIGN_OUT, REQUEST_PICKUP, REQUEST_DELIVERY} from '../../setup/actionTypes';
import objectAssign from 'object-assign';
import initialState from '../../setup/initialState';

export default function userReducer(state = initialState.myStuff, action) {
  let newState = {};
  switch (action.type) {

    case CLOSE_EDIT_STUFF_MODAL:
      return objectAssign({}, state, {editStuffModal:initialState.myStuff.editStuffModal});

    case SHOW_EDIT_STUFF_MODAL:
      return objectAssign({}, state, {editStuffModal:objectAssign({}, action.details, {show:true}, {photos:[]})});

    case EDIT_FIELD_CHANGE:
      return objectAssign({}, state, {editStuffModal:objectAssign({}, state.editStuffModal, action.fieldObj)});

    case LOAD_MY_STUFF_SUCCESS:
      return objectAssign({}, state, action.myStuff);

    case LOAD_ITEM_PHOTOS_SUCCESS:
      return objectAssign({}, state, {editStuffModal:objectAssign({}, state.editStuffModal, {photos:action.photos})});

    case SIGN_OUT:
      return initialState.myStuff;

    case REQUEST_PICKUP:
      newState[action.statusIndex] = state[action.statusIndex].map(item=>{ return (item._id==action.itemId?objectAssign({},item,{pickup:!item.pickup}):item); });
      return objectAssign({}, state, newState);

    case REQUEST_DELIVERY:
      newState[action.statusIndex] = state[action.statusIndex].map(item=>{ return (item._id==action.itemId?objectAssign({},item,{delivery:!item.delivery}):item); });
      return objectAssign({}, state, newState);

    default:
      return state;
  }
}
