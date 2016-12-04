import {UPDATE_DATE, UPDATE_TIME, UPDATE_ZIP, UPDATE_EMAIL, UPDATE_CARD_TOKEN, SHOW_SIGNIN, CLOSE_SIGNIN, SIGN_IN_FAILED, LOAD_USER, LOAD_INVOICES_SUCCESS, SIGN_IN, SIGN_OUT, USER_CREATED_SUCCESS, USER_SIGNED_IN_SUCCESS} from '../../setup/actionTypes';
import objectAssign from 'object-assign';
import initialState from '../../setup/initialState';

export default function userReducer(state = initialState.user, action) {
  let newState = {};
  switch (action.type) {

    case UPDATE_DATE:
      return objectAssign({},state,{apptDate:action.date});

    case UPDATE_TIME:
      return objectAssign({},state,{apptTime:action.time});

    case UPDATE_ZIP:
      return objectAssign({},state,{zip:action.zip});

    case UPDATE_EMAIL:
      return objectAssign({},state,{email:action.email});

    case UPDATE_CARD_TOKEN:
      return objectAssign({},state,{cardToken:action.token, lastFour:action.lastFour});

    case LOAD_USER:
      newState = action.user;
      newState.userSignedIn = true;
      return objectAssign({},state,newState);

    case LOAD_INVOICES_SUCCESS:
      return objectAssign({},state,{invoices:action.invoices});

    case SIGN_IN:
      return objectAssign({},state);

    case SHOW_SIGNIN:
      return objectAssign({},state,{showSignIn:true});

    case CLOSE_SIGNIN:
      return objectAssign({},state,{showSignIn:false});

    case SIGN_IN_FAILED:
      return objectAssign({},state,{signInError:action.message});

    case SIGN_OUT:
      return objectAssign({},initialState.user);

    case USER_CREATED_SUCCESS:
      return objectAssign({},state,action.user,{userSignedIn:true});

    case USER_SIGNED_IN_SUCCESS:
      return objectAssign({},state,action.user,{userSignedIn:true});

    default:
      return state;
  }
}
