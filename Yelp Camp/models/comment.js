const mongoose = require('mongoose');
// Schema Setup
const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
