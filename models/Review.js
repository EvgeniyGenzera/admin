const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
  name: String,
  text: String,
  visible: String,
});

module.exports = mongoose.model('Review', reviewSchema);
