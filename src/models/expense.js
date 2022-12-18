const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  value: {
    type: mongoose.Decimal128,
    unique: true,
    required: true
  },
  category_id: {
    type: mongoose.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);

