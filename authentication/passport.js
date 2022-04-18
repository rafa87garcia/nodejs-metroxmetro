const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const LocalStrategy = passportLocal.Strategy;

const SKIP = 15;
passport.use(
  'register',
  new LocalStrategy(
    {
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
        userSave.password = undefined;
        done(null, userSave);
      } catch (error) {
        return done(error);
      }
    }
  ));

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
    async (req, username, password, done) => {
      try {
        const currentUser = await User.findOne({ email: username });

        // 2. Si el usuario no existe fallamos (porque no puede logearse nadie que no esté registrado)
        if (!currentUser) {
          const error = new Error('User not register');
          return done(error);
        }

        const passValid = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!passValid) {
          const error = new Error('The email & password combination is incorrect!');
          return done(error);
        }

        currentUser.password = undefined;
        return done(null, currentUser);
      } catch (error) {
        return done(error);
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