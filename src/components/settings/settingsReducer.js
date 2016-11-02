import {GET_SETTINGS_SUCCESS} from '../../setup/actionTypes';
import initialState from '../../setup/initialState';

export default function userReducer(state = initialState.settings, action) {
  switch (action.type) {

    case GET_SETTINGS_SUCCESS:
      return action.settings;

    default:
      return state;
  }
}
