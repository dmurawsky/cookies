/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './fonts/glyphicons-halflings-regular.eot';
import './fonts/glyphicons-halflings-regular.ttf';
import './fonts/glyphicons-halflings-regular.woff';
import './fonts/glyphicons-halflings-regular.woff2';
import './fonts/glyphicons-halflings-regular.svg';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import './styles/bootstrap.min.css';
import { syncHistoryWithStore } from 'react-router-redux';
// import {loadProducts} from './components/cart/cartActions';
import {loadUser} from './components/user/userActions';
import {getFaqcats} from './components/content/contentActions';
import {getSettings} from './components/settings/settingsActions';

const store = configureStore();
// store.dispatch(loadProducts());
// store.dispatch(loadInvoices());
store.dispatch(loadUser());
store.dispatch(getFaqcats());
store.dispatch(getSettings());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
  </Provider>, document.getElementById('app')
);
