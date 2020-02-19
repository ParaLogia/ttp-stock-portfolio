const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Schema.Types.Decimal128,
    default: "5000.00"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema);