const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const saleSchema = new Schema({
  name: String,
  photo: String,
  visible: String,
});

module.exports = mongoose.model('Sale', saleSchema);
