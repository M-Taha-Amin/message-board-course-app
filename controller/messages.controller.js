const Message = require('../models/message.model.js');

const createMessage = async (req, res) => {
  const { content } = req.body;
  await Message.create({ content, author: req.userId });
  return res.redirect('/');
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  const { content, author } = req.body;
  if (content) {
    message.content = content;
  }
  if (author) {
    message.author = author;
  }
  await message.save();
  return res.redirect('/');
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  await Message.deleteOne({ _id: id });
  return res.redirect('/');
};

module.exports = { createMessage, updateMessage, deleteMessage };
