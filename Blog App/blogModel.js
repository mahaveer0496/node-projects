/* eslint linebreak-style : 0 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_app');
mongoose.Promise = global.Promise;
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Second Blog',
//   image: 'Second Image',
//   body: 'This is the body of the Second more fun blog',
// }).then((data) => {
//   console.log(data);
// });

module.exports = Blog;
