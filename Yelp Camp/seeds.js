const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds rest',
    image: 'bla bla bla',
    description: 'more bla bla bla',
  }, {
    name: 'ONE PUNCHHHH MANNNNN',
    image: 'bla bla bla',
    description: 'more bla bla bla',
  }, {
    name: 'What the REST? rest',
    image: 'bla bla bla',
    description: 'more bla bla bla',
  }, {
    name: 'Boku NO HEROOOO!!!',
    image: 'bla bla bla',
    description: 'more bla bla bla bla bla',
  },
];
function seedDB() {
  Campground.remove().then(() => {
    data.map((val) => {
      Campground.create(val).then((campground) => {
        console.log('add campground');
        Comment.create({
          text: 'This place is awesome',
          author: 'Homer Simpsoon',
        }).then((comment) => {
          campground.comments.push(comment);
          campground.save();
          console.log('added comment');
        });
      });
    });
  }, (err) => {
    console.log(err);
  });
}
module.exports = seedDB;
