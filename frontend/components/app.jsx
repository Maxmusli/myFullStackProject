import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Home from './home/home';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import SearchContainer from './search/search_container';
import BusinessShowContainer from './business/business_show_container';
import BusinessIndexContainer from './business/business_index_container'

export default () => {
  
  return (
    <div>
      <Switch>
        <Route exact path="/search/:businessId" component={BusinessShowContainer} />
        <Route exact path="/businesses" component={BusinessIndexContainer} />
        <Route exact path="/search" component={SearchContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
};