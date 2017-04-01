var express = require('express');
var hbs = require('hbs')
var app = express();

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('home', {
      pageTitle: 'Home page',
      currentYear: new Date().getFullYear(),
      welcomeMessage: 'Welcome to our Website'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      pageTitle: 'About page',
      currentYear: new Date().getFullYear()
   })
})
app.listen(3000, () => {
   console.log('app listening on port 3000!')
})