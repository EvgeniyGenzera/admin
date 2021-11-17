const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const landingSchema = new Schema({
  bannerTxt: {
      type: String,
      required: true,
  },
  banner: {
    heading: {
      en: String,
      ru: String,
    },
    image: String
  }
});

module.exports = mongoose.model('Landing', landingSchema);
