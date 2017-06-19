const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const seedDB = require('./seedsDB');
const User = require('./models/UserModel');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config');

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
// seedDB();
app.use(require('cors')());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy({
  usernameField: 'email',
  passwordField: 'password',
}));
// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  console.log(req.user);
  next();
});
app.get('/', (req, res) => {
  res.send('this is the root path ');
});

app.use('/api/user', userRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
