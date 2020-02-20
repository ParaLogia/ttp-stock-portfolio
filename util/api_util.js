const axios = require('axios');
const { iexToken } = require('../config/keys');

const getQuote = (symbol) => {
  const url =
    `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${iexToken}`
    + "&filter=symbol,latestPrice,open,previousClose";

  return axios.get(url)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    })
}

const getQuotes = (symbols) => {
  const symbolNames = symbols.map(encodeURIComponent).join(',')
  const url = 
    "https://sandbox.iexapis.com/stable/stock/market/batch?types=quote"
    + `&symbols=${symbolNames}&token=${iexToken}`
    + "&filter=symbol,latestPrice,previousClose,open"

  return axios.get(url)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    })
}

module.exports = {
  getQuote,
  getQuotes
}