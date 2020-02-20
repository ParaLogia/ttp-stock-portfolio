import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT
} from '../actions/session_actions';
import { RECEIVE_PORTFOLIO } from '../actions/transaction_actions'

const _preloadedState = {
  user: null
};

export default function (state = _preloadedState, action) {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        user: action.currentUser
      };

    case RECEIVE_USER_LOGOUT:
      return _preloadedState

    case RECEIVE_PORTFOLIO:
      return {
        user: Object.assign({}, state.user, {
          balance: action.balance
        })
      }

    default:
      return state;
  }
}