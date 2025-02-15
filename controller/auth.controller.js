const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  if (req.isAuthenticated) {
    return res.redirect('/');
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User Not Found' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid Password' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });
  res.cookie('token', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return res.redirect('/');
};

const registerUser = async (req, res) => {
  if (req.isAuthenticated) {
    return res.redirect('/');
  }
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User Already Exists' });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  await User.create({ username, email, password: hashPassword });
  return res.redirect('/login');
};

const logoutUser = async (req, res) => {
  res.clearCookie('token');
  return res.status(404).redirect("/")
};

module.exports = { loginUser, registerUser, logoutUser };
