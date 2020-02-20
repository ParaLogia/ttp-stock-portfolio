const axios = require('axios');
const { iexToken } = require('../config/keys');

const getQuote = (symbol) => {
  const url =
    `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${iexToken}`;

  return axios.get(url)
    .then(({ data }) => ({
      symbol: data.symbol,
      price: data.latestPrice,
      open: data.open || data.previousClose
    }))
    .catch(err => {
      throw err.response.data;
    })
}

module.exports = {
  getQuote
}