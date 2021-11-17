const mongoose = require('mongoose');

const { Schema } = mongoose;

const portfolioSchema = new Schema({
  title: String,
  photo: String,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
