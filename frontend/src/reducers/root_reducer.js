import { combineReducers } from 'redux';
import session from './session_reducer';
import portfolio from './portfolio_reducer';
import transactions from './transactions_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
  session,
  portfolio,
  transactions,
  errors
});

export default RootReducer;