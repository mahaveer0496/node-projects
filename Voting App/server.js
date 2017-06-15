const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/voting_app');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/api', (req, res) => {
  res.json({ "hi": "bye" });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
