const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const date = moment.utc().toDate();

const callbackSchema = new Schema({
  created: {
    type: Date,
    default: date,
  },
  name: String,
  phone: String,
  message: String,
  type: String,
});

module.exports = mongoose.model('Callback', callbackSchema);
