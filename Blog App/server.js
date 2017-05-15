/* eslint linebreak-style : 0 */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_app');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log(`App is running on ${3000}`);
});
