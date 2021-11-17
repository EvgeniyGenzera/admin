const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const mainSliderSchema = new Schema({
  name: String,
  nameRU: String,
  description: String,
  descriptionRU: String,
  photo: String,
  link: String,
  visible: String,
});

module.exports = mongoose.model('MainSlider', mainSliderSchema);
