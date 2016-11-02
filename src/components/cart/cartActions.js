import * as types from '../../setup/actionTypes';
import objectAssign from 'object-assign';
import 'whatwg-fetch';

export function open() {
  return {
    type: types.OPEN_CART
  };
}

export function close() {
  return {
    type: types.CLOSE_CART
  };
}

export function updateDeliveryPrice(level) {
  return {
    type: types.UPDATE_DELIVERY_PRICE,
    level
  };
}

export function loadProducts(zip) {
  return function(dispatch, getState, api) {
    return fetch(api+'getProducts/'+(zip&&zip.length>0?zip:'none'))
      .then(response => response.json())
      .then(json => {
        if (json.data){
          dispatch({
            type: types.LOAD_PRODUCTS,
            products: json.data.map(product=>{
              // localStorage.setItem(product._id, "");
              const cached = localStorage.getItem(product._id);
              if (cached && cached.length>0){
                return objectAssign({}, product, JSON.parse(cached));
              } else {
                return objectAssign({}, product, {qty:0,subtotal:0});
              }
            })
          });
        }
      }
    );
  };
}

export function loadPricing() {
  return function(dispatch, getState, api) {
    return fetch(api+'products')
      .then(response => response.json())
      .then(json => {
        if (json.data){
          dispatch({
            type: types.LOAD_PRICING,
            pricing: json.data
          });
        }
      }
    );
  };
}

export function incrementQty(id) {
  return { type: types.INCREMENT_QTY, id };
}

export function decrementQty(id) {
  return { type: types.DECREMENT_QTY, id };
}
