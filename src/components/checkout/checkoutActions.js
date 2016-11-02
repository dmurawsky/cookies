import * as types from '../../setup/actionTypes';
import { browserHistory } from 'react-router';
import { loadUser } from '../user/userActions';
import 'whatwg-fetch';

export function checkout() {
  return function(dispatch, getState, api) {
    const cartProducts = getState().cart.products.filter(prod=>prod.qty>0);
    const customer = getState().user;
    const pickups = getState().myStuff.customer.filter(item=>item.pickup);
    const deliveries = getState().myStuff.stored.filter(item=>item.delivery);
    const appt = {
      products:cartProducts,
      customer,
      pickups,
      deliveries
    };
    return fetch(api+'checkout',{
      method:'post',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(appt)
    }).then(() => {
      dispatch(loadUser());
      dispatch({type: types.EMPTY_CART});
      browserHistory.push('/my-stuff');
    });
  };
}
