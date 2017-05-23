const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp');
mongoose.Promise = global.Promise;
// Schema Setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
