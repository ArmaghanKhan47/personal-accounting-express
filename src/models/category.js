const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  user_id: {
    type: mongoose.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Category', CategorySchema);

