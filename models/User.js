/* eslint-disable func-names */
const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const date = moment.utc().toDate();

const userSchema = new Schema({
  created: {
    type: Date,
    default: date,
  },
  email: {
    type: String,
    // unique: true,
    // lowercase: true,
    // trim: true,
    // validate: [validator.isEmail, 'Invalid Email Address'],
    // required: 'Please Supply an email address',
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: 'Please supply a phone number',
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  additionalPhone: {
    type: String,
  },
  address: {
    street: String,
    houseNumber: String,
    porch: String,
    floor: String,
    apartment: String,
    code: String,
  },
  dateOfBirth: {
    type: String,
  },
  source: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
  ],
  updated: {
    type: Boolean,
    default: false,
  },
  getPrize: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'phone',
  usernameQueryField: ['phone', 'email'],
});
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
