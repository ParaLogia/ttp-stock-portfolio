import * as APIUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const CLEAR_TRANSACTION_ERRORS = "CLEAR_TRANSACTION_ERRORS";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";

export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
});

export const receiveTransaction = ({ transaction, balance }) => ({
  type: RECEIVE_TRANSACTION,
  transaction,
  balance
});

export const receiveTransactionErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
});

export const clearTransactionErrors = () => ({
  type: CLEAR_TRANSACTION_ERRORS
});

export const receivePortfolio = ({ portfolio, balance }) => ({
  type: RECEIVE_PORTFOLIO,
  portfolio,
  balance
});

export const fetchTransactions = () => dispatch => {
  return APIUtil.fetchTransactions()
    .then(res => dispatch(receiveTransactions(res.data)))
    .catch(err => dispatch(receiveTransactionErrors(err.response.data)))
}

export const createTransaction = transactionData => dispatch => {
  return APIUtil.createTransaction(transactionData)
    .then(res => dispatch(receiveTransaction(res.data)))
    .catch(err => dispatch(receiveTransactionErrors(err.response.data)))
}

export const fetchPortfolio = () => dispatch => {
  return APIUtil.fetchPortfolio()
    .then(res => dispatch(receivePortfolio(res.data)))
    .catch(err => dispatch(receiveTransactionErrors(err.response.data)))
}
