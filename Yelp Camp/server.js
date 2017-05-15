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
  description: String,
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//   name: 'Nanda',
//   image: 'Demo',
//   description: 'Some japanese which is pretty amazing and with ton of emotions',
// }).then((data) => {
//   console.log(data);
// });

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
  Campground.findById(id).then((campground) => {
    res.render('show', { campground });
  }, (err) => {
    console.log(err);
  });
});

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
