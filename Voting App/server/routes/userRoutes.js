const express = require('express');
const passport = require('passport');

const User = require('./../models/UserModel');

const userRoutes = express.Router();
userRoutes.route('/')
.get((req, res) => {
  res.send({ hi: 'bye' });
})
.post((req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.register(new User({ email }), password, (err, user) => {
    if (err) { return res.send(err); }
    return res.send(user);
    // passport.authenticate('local');
  });
});

userRoutes.route('/secret')
.get(passport.authenticate('local'), (req, res) => {
  res.send({ hi: 'bye' });
});

module.exports = userRoutes;
