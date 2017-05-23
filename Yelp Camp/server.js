const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const Campground = require('./models/campground');
const seedDB = require('./seeds');

seedDB();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));


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
