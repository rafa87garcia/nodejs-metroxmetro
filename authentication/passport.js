const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = passportLocal.Strategy;

const SKIP = 15;
passport.use(
  'register',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
    async (req, username, password, done) => {
      try {
        const userCurrent = await User.findOne({ email: username });
        if (userCurrent) {
          const error = new Error("User exist");
          done(error);
        }

        const passEncry = await bcrypt.hash(password, SKIP);

        const newUser = new User({
          email: username,
          password: passEncry,
          name: req.body.name,
          rol: req.body.rol,
        });
        const userSave = await newUser.save();
        userSave.password = null;
        done(null, userSave);
      } catch (error) {
        done(error);
      }
    })
);
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});