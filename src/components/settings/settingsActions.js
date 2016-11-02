import * as types from '../../setup/actionTypes';
import 'whatwg-fetch';

export function getSettings() {
  return function(dispatch, getState, api) {
    return fetch(api+'getSettings')
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: types.GET_SETTINGS_SUCCESS,
        settings: json.data
      });
    });
  };
}
