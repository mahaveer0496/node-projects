const mongoose = require('mongoose');
const Campground = require('./models/campground');
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
        console.log(campground);
      });
    });
  }, (err) => {
    console.log(err);
  });
}
module.exports = seedDB;
