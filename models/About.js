const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutSchema = new Schema({
  textUA: String,
  textRU: String,
});

module.exports = mongoose.model('About', aboutSchema);
