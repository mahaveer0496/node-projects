const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// routes---
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
// config----
const config = require('./config');
const passportConfig = require('./passportconfig');
const appConfig = require('./appConfig');

const app = express();
const PORT = process.env.PORT || 3000;

const seedDB = require('./seedsDB');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo);
seedDB();

appConfig(app);
passportConfig(passport);

app.get('/', (req, res) => {
  res.send('this is the root path ');
});

app.use('/user', userRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
