const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seeds');

const app = express();
seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp');
mongoose.Promise = global.Promise;
app.set('view engine', 'ejs');
app.use(require('express-session')({
  secret: 'this is yelp camp',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
  res.render('landing', {
    pageTitle: 'landing page',
    welcomeMessage: 'Welcome to our Website',
  });
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}).then((campgrounds) => {
    res.render('index', {
      campgrounds,
    });
  }, (err) => {
    console.log(`error : ${err}`);
  });
});

app.post('/campgrounds', (req, res) => {
  const {
    name,
    image,
    description,
  } = req.body;

  Campground.create({
    name,
    image,
    description,
  }).then(() => {
    res.redirect('/campgrounds');
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
  const { id } = req.params;
  Campground.findById(id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log('error');
    } else {
      res.render('show', { campground });
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username });
  User.register(user, password, (err, user) => {
    if (err) {
      console.log(`error ${err}`);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'));
  });
});
app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
