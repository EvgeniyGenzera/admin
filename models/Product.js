const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const productSchema = new Schema({
  nameUA: String,
  nameRU: String,
  descUA: String,
  descRU: String,
  newPrice: String,
  oldPrice: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductCategory',
  },
  photo: String,
});

module.exports = mongoose.model('Product', productSchema);
