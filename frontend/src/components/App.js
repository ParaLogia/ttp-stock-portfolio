import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Home from './portfolio/home';
import TransactionHistory from './transactions/transaction_history'

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path ="/transactions" component={TransactionHistory} />
      <ProtectedRoute path ="/" component={Home} />
    </Switch>
  </>
);

export default App;