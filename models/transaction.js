// models/transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: { type: String, enum: ['expense', 'income'] },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
