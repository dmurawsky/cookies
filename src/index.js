/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

require('./favicon.ico');
import './fonts/glyphicons-halflings-regular.eot';
import './fonts/glyphicons-halflings-regular.ttf';
import './fonts/glyphicons-halflings-regular.woff';
import './fonts/glyphicons-halflings-regular.woff2';
import './fonts/glyphicons-halflings-regular.svg';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import './styles/bootstrap.min.css';
import './styles/bootstrap-theme.min.css';
import './styles/slick.min.css';
import './styles/styles.scss';
import { syncHistoryWithStore } from 'react-router-redux';
import {loadUser} from './components/user/userActions';
import {getFaqcats, getVerbiage} from './components/content/contentActions';
import {getSettings} from './components/settings/settingsActions';

const store = configureStore();
store.dispatch(getVerbiage());
store.dispatch(getFaqcats());
store.dispatch(loadUser());
store.dispatch(getSettings());

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
  </Provider>, document.getElementById('app')
);
