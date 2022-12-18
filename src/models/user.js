const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
});

// UserSchema.pre('save', function(next){

//   bcrypt.hash(this.password, 5).then((hash) => {
//     this.password = hash;
//     next();
//   });
// })

module.exports = mongoose.model('User', UserSchema);

