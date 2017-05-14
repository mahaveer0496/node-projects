/* eslint-env node */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('home', {
      pageTitle: 'Home page',
      welcomeMessage: 'Welcome to our Website'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      pageTitle: 'About Page',
      title: 'tothih'
   })
})

app.get('*', (req, res) => {
   res.status(404).send('page not found')
})

app.listen(3000, () => {
   console.log('app listening on port 3000!')
})
