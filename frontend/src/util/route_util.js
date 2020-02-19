import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, exact, path, loggedIn }) => (
  <Route 
    exact={exact} 
    path={path} 
    render={(props) => (
      loggedIn ? (
        <Redirect to="/portfolio" />
      ) : (
        <Component {...props} />
      )
    )} />
);

const Protected = ({ component: Component, exact, path, loggedIn }) => (
  <Route 
    exact={exact} 
    path={path} 
    render={props => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )} />
);

const msp = state => ({ 
  loggedIn: Boolean(state.session.user)
});

export const AuthRoute = withRouter(connect(msp)(Auth));

export const ProtectedRoute = withRouter(connect(msp)(Protected));