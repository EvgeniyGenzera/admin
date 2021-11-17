const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  titleUA: String,
  titleRU: String,
  descriptionUA: String,
  descriptionRU: String,
  photo: String,
});

module.exports = mongoose.model('Service', serviceSchema);
