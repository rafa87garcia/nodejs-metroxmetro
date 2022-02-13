const express = require('express');
const passport = require('../authentication/passport');

const router = express.Router();

// router.post('/registro', (req, res, next) => {

//     passport.authenticate('register', (error, user) => {
//         if (error) {
//             return next(error);
//         }

//         req.logIn(user, (errorLogin => {
//             if (errorLogin) {
//                 return next(errorLogin);
//             }
//             res.status(201).json(user);
//         }));
//     })(req);
// });

// router.post('/login', (req, res, next) => {

//     passport.authenticate('login', (error, user) => {
//         if (error) {
//             return next(error);
//         }
//         req.logIn(user, (errorLogin => {
//             if (errorLogin) {
//                 return next(errorLogin);
//             }
//             res.status(200).json(user);
//         }));
//     })(req);
// });

// router.post('/logout', (req, res, next) => {
//     console.log(req.user);
//     if (!req.user) {
//         return res.sendStatus(304);
//     }
//     req.logOut();

//     return req.session.destoy(() => {
//         return res.status(200).json("Usuarios desconectado");
//     });
// });


module.exports = router;