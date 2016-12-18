import { combineReducers } from 'redux';
import user from '../components/user/userReducer';
import settings from '../components/settings/settingsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  settings,
  routing: routerReducer
});

export default rootReducer;
