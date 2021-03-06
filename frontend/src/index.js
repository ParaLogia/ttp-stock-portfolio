import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import './styles/index.css'

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};

  if (localStorage.jwtToken) {    
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp >= currentTime) {
      setAuthToken(localStorage.jwtToken);
      decodedUser.balance = localStorage.balance;
      preloadedState = { session: { user: decodedUser } };
    } else {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('balance')
    }
  }
  const store = configureStore(preloadedState);

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});