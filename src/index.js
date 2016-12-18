/* eslint-disable import/default */
/* global firebase */
/* eslint no-undef: "error" */

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
import './styles/bootstrap.min.css';
import './styles/bootstrap-theme.min.css';
import './styles/styles.sass';
import './styles/how-it-works.sass';
import './styles/product-list.sass';
import './styles/home-page.sass';
import './styles/faq.sass';
import { syncHistoryWithStore } from 'react-router-redux';
import {startWatchingUser, stopWatchingUser} from './components/user/userActions';
import {startWatchingSettings} from './components/settings/settingsActions';

const store = configureStore();

store.dispatch(startWatchingSettings());
firebase.auth().onAuthStateChanged((user) => {
  if (user){
    store.dispatch(startWatchingUser(user.uid));
  }else{
    store.dispatch(stopWatchingUser());
  }
});
firebase.auth().signInAnonymously().catch(function(error) {
  firebase.database().ref('errors').push(error);
});

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
  </Provider>, document.getElementById('app')
);
