const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  googleId: String, // Optional, only for Google users
});

module.exports = mongoose.model('User', userSchema);
