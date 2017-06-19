const express = require('express');
const passport = require('passport');
const User = require('./../models/UserModel');

const userRoutes = express.Router();

// userRoutes.route('/register')
//   .post((req, res, next) => {
//     const { email, password } = req.body;
//     User.create({ email, password }).then((user) => {
//       passport.authenticate('local', (err, user, info) => {
//         if (err) { return next(err); }
//         if (!user) { return res.redirect('/'); }
//         req.logIn(user, (err) => {
//           if (err) { return next(err); }
//           return res.redirect('/secret');
//         });
//       })(req, res, next);
//     });
//   });

userRoutes.route('/login')
.post(passport.authenticate('local-login', {
  successRedirect: '/user/secret',
  failureRedirect: '/',
}));

userRoutes.route('/secret')
  .get((req, res) => {
    res.send('shhhh! this is secret page');
  });


userRoutes.route('/logout')
  .get((req, res) => {
    req.logOut();
    res.send('logged you out!');
  });

module.exports = userRoutes;
