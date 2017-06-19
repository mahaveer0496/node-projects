const express = require('express');
const Poll = require('./../models/PollModel');

const apiRoutes = express.Router();

apiRoutes.route('/')
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


apiRoutes.route('/:pollId')
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
        votes: 0,
      });
      poll.save();
      res.send(poll);
    });
  });

apiRoutes.route('/:pollId/:topicId')
  .post((req, res) => {
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

module.exports = apiRoutes;