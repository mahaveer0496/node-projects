const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const seedDB = require('./seedsDB');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config');

const User = require('./models/UserModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(require('express-session')({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));
seedDB();
app.use(require('cors')());

app.use(passport.initialize());
app.use(passport.session());
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email }).then((user) => {
    if (!user) { return done(null, false, { message: 'wrong username' }); }
    if (user.password !== password) { return done(null, false, { message: 'wrong password' }); }
    return done(null, user);
  }, err => done(err));
}));

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.create({ email, password }).then((user) => {
    if (!user) { return done(null, false, { message: 'user already exists' }); }

    return done(null, user);
  }, err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }, err => done(err));
});

app.get('/', (req, res) => {
  res.send('this is the root path ');
});

app.use('/user', userRoutes);
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
