const express = require('express');
const passport = require('passport');
const Big = require('big.js');
const Transaction = require('../../models/Transaction');

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

    // TODO get price from API
    const unitPrice = new Big('3.14');
    const totalCost = new Big(body.quantity).times(unitPrice);
    const newBalance = new Big(user.balance).minus(totalCost);

    if (newBalance < 0) {
      return res.status(422).json({transaction: 'Insufficient balance'})
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

        newTransaction.save()
          .then(transaction => res.json({ 
            transaction,
            balance: user.balance.toString()
          }));
      })
      .catch(err => {
        res.status(422).json(err)
      })
  }
);

module.exports = router;