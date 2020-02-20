import axios from 'axios';

export const fetchTransactions = () => {
  return axios.get('/api/transactions', );
};

export const createTransaction = (transactionData) => {
  return axios.post('/api/transactions', transactionData);
};

export const fetchPortfolio = () => {
  return axios.get('/api/transactions/summary');
};