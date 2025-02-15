const Message = require('../models/message.model.js');
const User = require('../models/user.model.js');

const renderHome = async (req, res) => {
  const messages = await Message.find().populate('author');
  const loggedInUser = await User.findById(req.userId).select('username');
  return res.render('home', {
    messages,
    isAuthenticated: req.isAuthenticated,
    loggedInUser,
  });
};

const renderNewMessageForm = (req, res) => {
  if (!req.isAuthenticated) return res.redirect('/login');
  return res.render('new-message');
};
const renderUpdateMessageForm = async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  return res.render('update-message', {
    message,
  });
};

const renderLoginForm = (req, res) => {
  if (req.isAuthenticated) return res.redirect('/');
  return res.render('login');
};

const renderRegisterForm = (req, res) => {
  if (req.isAuthenticated) return res.redirect('/');
  return res.render('register');
};

module.exports = {
  renderHome,
  renderNewMessageForm,
  renderUpdateMessageForm,
  renderLoginForm,
  renderRegisterForm,
};
