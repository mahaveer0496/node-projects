/* eslint-env node */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_app');

const catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

const Cat = mongoose.model('Cat', catSchema);

const george = new Cat({
   name: 'George',
   age: 11,
   temperament: 'angry'
})

george.save().then((data) => {
   console.log(data);
}, (err) => {
   console.log('ERROR' + err);
})
const campgrounds = [{
      name: 'Teena',
      image: ' meena'
   },
   {
      name: 'Neena',
      image: 'sheena'
   }
]

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('landing', {
      pageTitle: 'landing page',
      welcomeMessage: 'Welcome to our Website'
   })
})

app.get('/campgrounds', (req, res) => {
   res.render('campgrounds', {campgrounds})
})

app.post('/campgrounds', (req, res) => {
   const {
      name,
      image
   } = req.body

   campgrounds.push({
      name,
      image
   })
   res.redirect('/campgrounds')
})

app.get('/campgrounds/new', (req, res) => {
   res.render('new')
})
app.get('*', (req, res) => {
   res.status(404).send('page not found')
})

app.listen(3000, () => {
   console.log('app listening on port 3000!')
})