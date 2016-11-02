import * as types from '../../setup/actionTypes';
import { browserHistory } from 'react-router';
import { loadMyStuff } from '../myStuff/myStuffActions';
import { loadProducts } from '../cart/cartActions';
import cookie from 'react-cookie';
import moment from 'moment';
import Q from 'q';
import 'whatwg-fetch';

export function updateDate(date) {
  return {
    type: types.UPDATE_DATE,
    date: date
  };
}

export function updateTime(time) {
  return {
    type: types.UPDATE_TIME,
    time: time
  };
}

export function updateZip(zip) {
  return {
    type: types.UPDATE_ZIP,
    zip: zip
  };
}

export function createAppt(deliveryFee) {
  return function(dispatch, getState, api) {
    const user = getState().user;
    return fetch(api+'appointment', {
      method:"post",
      headers: { "Content-type": "application/json" },
      body:JSON.stringify({userId:user._id, date:user.apptDate, time:user.apptTime, deliveryFee})
    })
    .then(() => {
      dispatch(loadUser(true));
      browserHistory.push('/checkout');
    });
  };
}

export function saveToken(resp) {
  browserHistory.push('/checkout');
  return { type: types.UPDATE_CARD_TOKEN, token: resp.id, lastFour: resp.card.last4 };
}

export function loadUser(noReset) {
  return function(dispatch, getState, api) {
    let cookies = cookie.select();
    if(cookies.se_user_id){
      return fetch(api+'customers/'+cookies.se_user_id)
      .then(response => response.json())
      .then(json => {
        if (!noReset){
          dispatch(loadMyStuff(cookies.se_user_id));
          dispatch(loadProducts(json.data.zip));
        }
        window.Intercom('boot', {
          app_id: 'sz3eop59',
          email: json.data.email,
          phone: json.data.phone,
          name: json.data.firstName+" "+json.data.lastName,
          user_id: json.data._id,
          appointment: moment(json.data.apptDate+" "+json.data.apptTime, "YYYY-MM-DD H").format('X')
        });
        dispatch({
          type: types.LOAD_USER,
          user: json.data
        });
      });
    }
  };
}

export function loadInvoices(customerId) {
  return function(dispatch, getState, api) {
    if(customerId){
      return fetch(api+'invoices/'+customerId)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.LOAD_INVOICES_SUCCESS,
          invoices: json.data
        });
      });
    }else{
      return Q.all([]).then(function(){
        dispatch({
          type: types.LOAD_INVOICES_SUCCESS,
          invoices: []
        });
        browserHistory.push('/');
      });
    }
  };
}

export function signOut() {
  cookie.remove('se_user_email');
  cookie.remove('se_user_id');
  browserHistory.push('/');
  return {
    type: types.SIGN_OUT
  };
}

export function showSignIn() {
  return {
    type: types.SHOW_SIGNIN
  };
}

export function closeSignIn() {
  return {
    type: types.CLOSE_SIGNIN
  };
}

export function createUser(user, stripeResponse) {
  return function(dispatch, getState, api) {
    return fetch(api+'signup',{
      method:'post',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify({user:user,cardToken:stripeResponse.id})
    })
    .then(response => response.json())
    .then(json => {
      cookie.save('se_user_email', json.data.email);
      cookie.save('se_user_id', json.data._id);
      dispatch({ type: types.USER_CREATED_SUCCESS, user: json.data });
      browserHistory.push('/appointment');
    });
  };
}

export function updateCard(body) {
  return function(dispatch, getState, api) {
    return fetch(api+'updateCard',{
      method:'post',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .then(() => {
      dispatch(loadUser());
    });
  };
}

export function updateCustomer(user) {
  return function(dispatch, getState, api) {
    return fetch(api+'customers/'+user._id,{
      method:'put',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(user)
    }).then(() => {
      dispatch(loadUser());
      browserHistory.push('/my-stuff');
    });
  };
}

export function updatePassword(password, id) {
  return function(dispatch, getState, api) {
    return fetch(api+'changePassword/'+id,{
      method:'put',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify({password})
    }).then(() => {
      dispatch({ type: types.PASSWORD_UPDATE_SUCCESS });
    });
  };
}

export function signIn(signin) {
  return function(dispatch, getState, api) {
    return fetch(api+'signIn',{
      method:'post',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(signin)
    })
    .then(response => response.json())
    .then(json => {
      if(json.data){
        cookie.save('se_user_email', json.data.email);
        cookie.save('se_user_id', json.data._id);
        dispatch(loadUser());
        dispatch(loadProducts(json.data.zip));
      }else{
        dispatch({ type: types.SIGN_IN_FAILED, message: json.info });
      }
    });
  };
}

export function navCheckout() {
  return function() {
    return Q.all([]).then(function(){
      browserHistory.push('/checkout');
    });
  };
}

export function navAppointment() {
  return function() {
    return Q.all([]).then(function(){
      browserHistory.push('/appointment');
    });
  };
}
