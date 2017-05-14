/* eslint linebreak-style : 0 */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

// Schema Setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', (req, res) => {
  res.render('landing', {
    pageTitle: 'landing page',
    welcomeMessage: 'Welcome to our Website',
  });
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}).then((campgrounds) => {
    res.render('campgrounds', {
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
  } = req.body;

  Campground.create({
    name,
    image,
  }).then(() => {
    res.redirect('/campgrounds');
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
