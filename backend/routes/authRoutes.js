const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../middlewares/validateUserInput');

// Validate inputs before calling controller
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

module.exports = router;
