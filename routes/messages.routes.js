const { Router } = require('express');
const {
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controller/messages.controller.js');

const router = Router();

router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
