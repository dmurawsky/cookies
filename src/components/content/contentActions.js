import * as types from '../../setup/actionTypes';
import 'whatwg-fetch';

export function getFaqs() {
  return function(dispatch, getState, api) {
    return fetch(api+'faqs')
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.LOAD_FAQS_SUCCESS,
        faqs: json.data
      });
    });
  };
}

export function getFaqcats() {
  return function(dispatch, getState, api) {
    return fetch(api+'faqcats')
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.LOAD_FAQCATS_SUCCESS,
        faqcats: json.data
      });
    });
  };
}
