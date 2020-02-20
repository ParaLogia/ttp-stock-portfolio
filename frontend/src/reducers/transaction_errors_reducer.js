import {
  RECEIVE_TRANSACTION,
  RECEIVE_TRANSACTION_ERRORS,
  CLEAR_TRANSACTION_ERRORS
} from '../actions/transaction_actions';

const _preloadedState = {};

const transactionErrorsReducer = (state = _preloadedState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRANSACTION_ERRORS:
      return action.errors;

    case CLEAR_TRANSACTION_ERRORS:
    case RECEIVE_TRANSACTION:
      return _preloadedState;

    default:
      return state;
  }
};

export default transactionErrorsReducer;