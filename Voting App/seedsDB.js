const Poll = require('./schema');

const polls = [{
  poll: 'this is first poll',
  topics: [{
    title: 'topic 1 for first poll',
    votes: 2,
  }],
}, {
  poll: 'this is second poll',
  topics: [{
    title: 'topic 1 for second poll',
    votes: 2,
  }],
}, {
  poll: 'this is third poll',
  topics: [{
    title: 'topic 1 for third poll',
    votes: 2,
  }],
}];

module.exports = function () {
  Poll.remove({}).then(() => {
    polls.map((poll) => {
      Poll.create(poll);
    });
  });
};
