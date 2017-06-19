const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
});
userSchema.methods.validPassword = pwd => (this.password === pwd);
module.exports = mongoose.model('User', userSchema);
