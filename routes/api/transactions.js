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
              symbol: body.symbol,
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
  const transactions = await Transaction.find({ user: user.id })

  const portfolio = {}
  for (let transaction of transactions) {
    const { symbol, quantity } = transaction
    if (portfolio.hasOwnProperty(symbol)) {
      portfolio[symbol].quantity += quantity
    }
    else {
      portfolio[symbol] = { 
        quantity,
        unitPrice: 0,
        totalPrice: 0,
        open: 0
      }
    }
  }
  const quotes = await ApiUtil.getQuotes(Object.keys(portfolio))

  Object.entries(quotes).forEach(([ symbol, { quote } ]) => {
    const { latestPrice, open, previousClose } = quote
    const stock = portfolio[symbol];
    stock.unitPrice = new Big(latestPrice)
    stock.totalPrice = stock.unitPrice.times(stock.quantity)
    stock.open = open || previousClose
  })

  return portfolio;
}

router.get('/summary', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    compilePortolio(req.user)
      .then(portfolio => res.json(portfolio))
      .catch(err => res.status(400).json(err))
  }
)

module.exports = router;