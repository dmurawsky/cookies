import {USER_UPDATE, USER_OFF} from '../../setup/actionTypes';
import initialState from '../../setup/initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {

    case USER_UPDATE:
      return action.user;

    case USER_OFF:
      return initialState.user;

    default:
      return state;
  }
}
