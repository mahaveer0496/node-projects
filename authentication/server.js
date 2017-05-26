const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');

const app = express();
mongoose.connect('mongodb://localhost:27017/auth_app');
mongoose.Promise = global.Promise;
app.set('view engine', 'ejs');
app.use(require('express-session')({
  secret: 'Rust is the dumbest dog',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const {
    username,
    password,
  } = req.body;
  User.register(new User({
    username,
  }), password,
    (err, user) => {
      if (err) {
        console.log(`err ${err}`);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secret');
      });
    });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login',
}), (req, res) => {
  res.send('woot');
});

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
