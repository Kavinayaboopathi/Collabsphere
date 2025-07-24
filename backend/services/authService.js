const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const registerUser = async (username, password) => {
  const userExists = await User.findOne({ username });
  if (userExists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });

  return {
    _id: newUser._id,
    username: newUser.username,
    token: generateToken(newUser._id),
  };
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    _id: user._id,
    username: user.username,
    token: generateToken(user._id),
  };
};

module.exports = { registerUser, loginUser };
