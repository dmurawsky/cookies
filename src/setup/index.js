import { combineReducers } from 'redux';
import user from '../components/user/userReducer';
import myStuff from '../components/myStuff/myStuffReducer';
import cart, * as fromCart from '../components/cart/cartReducer';
import settings from '../components/settings/settingsReducer';
import content from '../components/content/contentReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  myStuff,
  cart,
  settings,
  content,
  routing: routerReducer
});

export default rootReducer;

export const getCartTotals = (state) => fromCart.getCartTotals(state);
