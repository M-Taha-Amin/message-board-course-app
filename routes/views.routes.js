const { Router } = require('express');
const {
  renderHome,
  renderNewMessageForm,
  renderUpdateMessageForm,
  renderLoginForm,
  renderRegisterForm,
} = require('../controller/views.controller.js');
const jwt = require('jsonwebtoken');
const router = Router();

router.use((req, res, next) => {
  const token = req.cookies['token'];
  try {
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload.userId;
      req.isAuthenticated = true;
    } else {
      req.isAuthenticated = false;
    }
  } catch (error) {
    req.isAuthenticated = false;
  }

  next();
});
router.get('/', renderHome);
router.get('/login', renderLoginForm);
router.get('/register', renderRegisterForm);
router.get('/new-message', renderNewMessageForm);
router.get('/update-message/:id', renderUpdateMessageForm);

module.exports = router;
