const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Generate JWT token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          user.token = token; // attach token temporarily
          return done(null, user);
        }

        // Create new user
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails?.[0]?.value || '',
        });

        await newUser.save();

        // Generate token for new user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        newUser.token = token; // attach token temporarily
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // store user id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // retrieve full user object from DB
  } catch (err) {
    done(err, null);
  }
});
