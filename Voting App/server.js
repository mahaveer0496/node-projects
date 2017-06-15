const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seedDB = require('./seedsDB');
const Poll = require('./schema');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/voting_app');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));
seedDB();


app.get('/api', (req, res) => {
  Poll.find({}).then(data => {
    res.send(data)
  })
});

app.post('/api', (req, res, next) => {
  const { name, choice } = req.body;
  console.log(name, choice);
  res.send('success');
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
