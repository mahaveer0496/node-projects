/* eslint-env node */
var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('home', {
      pageTitle: 'Home page',
      welcomeMessage: 'Welcome to our Website'
   })
})

app.get('/about/:var', (req, res) => {
   res.render('about', {
      pageTitle: req.params.var,
      title: 'tothih'
   })
})
app.listen(3000, () => {
   console.log('app listening on port 3000!')
})