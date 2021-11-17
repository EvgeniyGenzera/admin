/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('admin/login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('admin/register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req
    .checkBody('password_confirmation', 'Confirmed Password cannot be blank!')
    .notEmpty();
  req
    .checkBody('password_confirmation', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash(
      'error',
      errors.map((err) => err.msg),
    );
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.validateRegisterApi = (req, res, next) => {
  req.checkBody('phone', 'You must supply a phone number!').notEmpty();
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req
    .checkBody('password_confirmation', 'Confirmed Password cannot be blank!')
    .notEmpty();
  req
    .checkBody('password_confirmation', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.status(500).json(errors);
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.register = async (req, res, next) => {
  const { email, phone, name, isAdmin = null } = req.body;
  const user = new User({
    email,
    phone,
    name,
    isAdmin,
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  return next(); // pass to authController.login
};

exports.registerApi = async (req, res, next) => {
  const { phone, isAdmin = null } = req.body;
  const user = new User({ phone, isAdmin });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  return next(); // pass to authController.login
};

exports.account = (req, res) => {
  res.render('account', { title: 'Edit Your Account' });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' },
  );
  req.flash('success', 'Updated the profile!');
  res.redirect('back');
};

exports.updateProfile = async (req, res) => {
  req.body.updated = true;
  const user = await User.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );
  res.status(200).json({
    status: 'successful',
    user,
  });
};
