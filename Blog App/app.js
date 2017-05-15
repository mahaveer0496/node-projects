/* eslint linebreak-style : 0 */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const Blog = require('./blogModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.render('index', { blogs });
  }, (err) => {
    console.log(`Error : ${err}`);
  });
});

app.get('/blogs/new', (req, res) => {
  res.render('new');
});

app.post('/blogs', (req, res) => {
  const { title, body, image } = req.body;
  Blog.create({ title, image, body }).then(() => {
    res.redirect('/blogs');
  });
});
app.get('/blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id).then((blog) => {
    res.render('show', { blog });
  });
});
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log(`App is running on ${3000}`);
});
