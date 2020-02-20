/* eslint-disable no-prototype-builtins */
const express = require('express');
const passport = require('passport');
const Big = require('big.js');
const Transaction = require('../../models/Transaction');
const validateTransactionInput = require('../../validation/transaction');
const ApiUtil = require('../../util/api_util');

const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Transaction.find({user: req.user.id})
      .then(transactions => res.json(transactions))
      .catch(err => res.status(422).json(err));
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user, body } = req;

    const { errors, isValid } = validateTransactionInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    ApiUtil.getQuote(body.symbol)
      .then(({ latestPrice }) => {
        const unitPrice = new Big(latestPrice);
        const totalCost = new Big(body.quantity).times(unitPrice);
        const newBalance = new Big(user.balance).minus(totalCost);

        if (newBalance < 0) {
          return res.status(422).json({balance: 'Insufficient balance'})
        }

        user.balance = newBalance.toString();

        user.save()
          .then(() => {
            const newTransaction = new Transaction({
              symbol: body.symbol.toUpperCase(),
              user: user.id,
              quantity: body.quantity,
              unitPrice
            });

            return newTransaction.save()              
          })
          .then(transaction => res.json({
            transaction,
            balance: user.balance.toString()
          }))
          .catch(err => {
            res.status(422).json(err)
          })
      })
      .catch(err => {
        res.status(422).json(err)
      })
  }
);

async function compilePortolio(user) {
  const transactions = 
    await Transaction
      .find({ user: user.id })
      .sort({ date: -1 })

  const stocks = {}
  for (let transaction of transactions) {
    const { quantity } = transaction
    const symbol = transaction.symbol.toUpperCase();
    if (stocks.hasOwnProperty(symbol)) {
      stocks[symbol].quantity += quantity
    }
    else {
      stocks[symbol] = { 
        quantity,
        unitPrice: 0,
        totalPrice: 0,
        trend: 0
      }
    }
  }
  const quotes = await ApiUtil.getQuotes(Object.keys(stocks))

  // Total value of portfolio
  let totalValue = new Big(0)

  Object.entries(quotes).forEach(([ symbol, { quote } ]) => {
    const { latestPrice, open, previousClose } = quote
    const stock = stocks[symbol];
    stock.unitPrice = new Big(latestPrice)
    stock.trend = stock.unitPrice.cmp(open || previousClose)
    stock.totalPrice = stock.unitPrice.times(stock.quantity).toFixed(2)
    stock.unitPrice = stock.unitPrice.toFixed(2)
    
    totalValue = totalValue.plus(stock.totalPrice)
  })

  totalValue = totalValue.toFixed(2)

  return {
    stocks,
    totalValue
  };
}

router.get('/summary', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    compilePortolio(req.user)
      .then(portfolio => res.json({ 
        portfolio,  
        balance : new Big(req.user.balance).toFixed(2)
      }))
      .catch(err => res.status(400).json(err))
  }
)

module.exports = router;