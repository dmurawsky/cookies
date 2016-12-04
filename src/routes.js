import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './setup/App';
import HomePage from './components/home/HomePage';
import AddStuffPage from './components/cart/AddStuffPage';
import PricingPage from './components/cart/PricingPage';
import AccountPage from './components/user/AccountPage';
import SignInPage from './components/user/SignInPage';
import SignupPage from './components/user/SignupPage';
import AppointmentPage from './components/user/AppointmentPage';
import FaqPage from './components/content/FaqPage';
import StorageTermsPage from './components/content/StorageTermsPage';
import WebsiteTermsPage from './components/content/WebsiteTermsPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import MyStuffPage from './components/myStuff/MyStuffPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="home" component={HomePage}/>
    <Route path="storage-terms" component={StorageTermsPage}/>
    <Route path="website-terms" component={WebsiteTermsPage}/>
    <Route path="faqs" component={FaqPage}/>
    <Route path="faqs/:category" component={FaqPage}/>
    <Route path="account" component={AccountPage}/>
    <Route path="add-stuff" component={AddStuffPage}/>
    <Route path="pricing" component={PricingPage}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="login" component={SignInPage}/>
    <Route path="appointment" component={AppointmentPage}/>
    <Route path="checkout" component={CheckoutPage}/>
    <Route path="my-stuff" component={MyStuffPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
