const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seedsDB');
const Poll = require('./schema');
const User = require('./UserModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(require('express-session')({
  secret: 'this is voting app',
  resave: false,
  saveUninitialized: false,
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/voting_app');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/dist`));
// seedDB();
app.use(require('cors')());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route('/api')
.get((req, res) => {
  Poll.find({}).then((data) => {
    res.send(data);
  });
})
.post((req, res) => {
  const { pollTitle } = req.body;
  Poll.create({
    poll: pollTitle,
  }).then(res.redirect('/api'));
});


app.route('/api/:pollId')
.get((req, res) => {
  const { pollId } = req.params;
  Poll.findById(pollId).then((poll) => {
    res.send(poll);
  });
})
.post((req, res) => {
  const { pollId } = req.params;
  const { title } = req.body;
  Poll.findById(pollId).then((poll) => {
    poll.topics.push({
      title,
      votes: 0
    });
    poll.save();
    res.send(poll);
  });
});


app.post('/api/:pollId/:topicId', (req, res) => {
  const { pollId, topicId } = req.params;
  // res.send({ pollId, topicId });
  Poll.findById(pollId).then((poll) => {
    poll.topics.map((topic) => {
      if (topic._id == topicId) {
        topic.votes += 1;
      }
      return topic;
    });
    poll.save();
    res.send(poll);
  });
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
