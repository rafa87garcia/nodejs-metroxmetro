const express = require('express');
const passport = require('passport');
require('../authentication/passport');

const router = express.Router();

router.post('/register', (req, res, next) => {

  const callback = (error, user) => {
    if (error) {
      console.log("Error al entrar al registro", error);
      return next(error);
    }

    req.logIn(user, (errorLogin => {
      if (errorLogin) {
        return next(errorLogin);
      }
      res.status(201).json(user);
    }));
  }

  passport.authenticate('register', callback)(req);
});

module.exports = router;