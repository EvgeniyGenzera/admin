const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const productCategory = new Schema({
  nameUA: String,
  nameRU: String,
});

module.exports = mongoose.model('ProductCategory', productCategory);
