const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const moment = require('moment');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Go to /time and replace time with your input');
})

app.get('/:time', (req, res) => {
  let {
    time
  } = req.params
  console.log(`time ${time}`);
  res.send(validate(time));
})


app.get('*', (req, res) => {
  res.status(404).send('page not found')
})

app.listen(PORT, () => {
  console.log(`app listening on port PORT`);
})



const formats = [
  'D-M-Y',
  'D M Y',
  'M-D-Y',
  'M D Y',
  'Y-M-D',
  'Y M D'
];

function validate(date) {
  let utc, unix;
  utc = moment.utc(date, formats, true);
  if (utc.isValid()) {
    unix = utc.unix() * 1000;
    utc = utc.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT'
    return {
      utc,
      unix
    }
  }
  if (isNaN(date)) return {
    "error": "Invalid Date"
  };
  utc = moment.utc(+date);
  if (utc.isValid()) {
    unix = +date;
    utc = utc.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT'
    return {
      utc,
      unix
    }
  }
  return {
    "error": "Invalid Date"
  };
}