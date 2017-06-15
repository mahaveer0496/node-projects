const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send('Welcome to hom page');
});

app.get('*', (req, res) => {
  res.status(404).send('page not found');
});

app.listen(PORT, () => {
  console.log('app listening on port PORT');
});
