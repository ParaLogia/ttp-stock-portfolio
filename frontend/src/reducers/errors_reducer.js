import { combineReducers } from 'redux';

import sessionErrors from './session_errors_reducer';
import transactionErrors from './transaction_errors_reducer';

export default combineReducers({
  session: sessionErrors,
  transaction: transactionErrors
});