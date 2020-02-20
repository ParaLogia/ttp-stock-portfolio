const Validator = require('validator');
const { validText } = require('./utils');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.symbol = validText(data.symbol) ? data.symbol : '';
  data.quantity = data.quantity.toString();

  if (Validator.isEmpty(data.symbol)) {
    errors.symbol = 'Ticker symbol is required';
  }

  if (!Validator.isInt(data.quantity)) {
    errors.quantity = 'Quantity must be an integer';
  }

  if (data.quantity < 1) {
    errors.quantity = 'Quantity must be at least 1';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};