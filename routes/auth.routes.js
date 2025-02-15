const { Router } = require('express');
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controller/auth.controller.js');

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

module.exports = router;
