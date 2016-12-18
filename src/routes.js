import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './setup/App';
import HomePage from './components/settings/HomePage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="home" component={HomePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
