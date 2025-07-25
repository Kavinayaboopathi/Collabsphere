const express = require('express');
const passport = require('passport');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../middlewares/validateUserInput');

// Local Auth Routes
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

// Google OAuth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: false,
  }),
  (req, res) => {
    // Success: send token and redirect
    const token = req.user.token;
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

module.exports = router;
