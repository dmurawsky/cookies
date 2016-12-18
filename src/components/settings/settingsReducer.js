import {SETTINGS_UPDATE, SETTINGS_OFF} from '../../setup/actionTypes';
import initialState from '../../setup/initialState';

export default function userReducer(state = initialState.settings, action) {
  switch (action.type) {

    case SETTINGS_UPDATE:
      return action.settings;

    case SETTINGS_OFF:
      return initialState.settings;

    default:
      return state;
  }
}
