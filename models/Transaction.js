const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Schema.Types.Decimal128,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

TransactionSchema.index({
  users: 1,
  date: -1
})

module.exports = mongoose.model('Transaction', TransactionSchema);