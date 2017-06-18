const express = require('express');
const User = require('./../models/UserModel');

const userRoutes = express.Router();

userRoutes.route('/').get((req, res) => {
  res.send({ hi: 'bye' });
});

module.exports = userRoutes;
