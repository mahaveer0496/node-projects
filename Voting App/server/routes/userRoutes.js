const express = require('express');
const passport = require('passport');
const User = require('./../models/UserModel');

const userRoutes = express.Router();

userRoutes.route('/checkAuth')
  .get((req, res) => {
    res.send(req.isAuthenticated());
  });

userRoutes.route('/register')
  .post((req, res, next) => {
    passport.authenticate('local-register', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.send(info);
      req.logIn(user, (error) => {
        if (err) { return next(error); }
        return res.status(200).send(info);
      });
    })(req, res, next);
  });


userRoutes.route('/login')
.post((req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    // console.log(user);
    if (err) return res.send(err);
    if (!user) return res.send(info);
    req.logIn(user, (error) => {
      if (err) return res.send(error);
      return res.status(200).send(info);
    });
  })(req, res, next);
});

userRoutes.route('/secret')
  .get((req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.send('unauthenticated');
  }, (req, res) => {
    res.send('shhhh! this is secret page');
  });


userRoutes.route('/logout')
  .get((req, res) => {
    req.logOut();
    res.send('logged you out!');
  });

module.exports = userRoutes;
