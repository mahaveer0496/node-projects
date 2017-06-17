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
// seedDB();
app.use(require('cors')());

app.get('/api', (req, res) => {
  Poll.find({}).then((data) => {
    res.send(data);
  });
});

app.post('/api', (req, res) => {
  const { pollTitle } = req.body;
  Poll.create({
    poll: pollTitle,
  }).then(res.redirect('/api'));
});

app.get('/api/:pollId', (req, res) => {
  const { pollId } = req.params;
  Poll.findById(pollId).then((poll) => {
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
    res.redirect('/api');
  });
});
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
