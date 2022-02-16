const express = require('express');
const passport = require('passport');
const { signIn } = require('../authentication/jsonwebtoken');

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

router.post('/login', (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      console.log("Error al entrar al login", error);
      return next(error);
    }

    req.logIn(user, (errorLogin => {
      if (errorLogin) {
        return next(errorLogin);
      }
      const token = new signIn(user, req.app.get('jwt-secret'));
      res.status(201).json({ userId: user._id, token });
    }));
  }

  passport.authenticate('login', callback)(req);
});

router.post('/logout', (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(301);
  }
  req.logOut();

  return res.status(200).json("User session close");
});

module.exports = router;