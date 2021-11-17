/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const promisify = require('es6-promisify');
// const jwt = require('jsonwebtoken');
const mail = require('../handlers/mail');

// exports.login = passport.authenticate('local', {
//   failureRedirect: '/login',
//   failureFlash: 'Failed Login!',
//   successRedirect: '/',
//   successFlash: 'You are now logged in!'
// });

exports.login = async (req, res, next) => {
  const { phone } = req.body;
  const { referer } = req.headers;
  console.log(process.env.NODE_ENV);
  const ROOT_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.ROOT_URL
      : process.env.ROOT_URL_PROD;

  const requestedUser = await User.findOne({ phone });

  // if (referer === `${ROOT_URL}register` || referer === `${ROOT_URL}login`) {
  if (requestedUser === null) {
    req.flash('danger', 'Неверное имя пользователя или пароль');
    return res.redirect('/admin/login');
  }

  if (
    requestedUser.isAdmin == null ||
    requestedUser.isAdmin === 'false' ||
    requestedUser.isAdmin === false
  ) {
    req.flash('danger', 'Неверное имя пользователя или пароль');
    return res.redirect('/admin/login');
  }

  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    if (!user) {
      if (info && info.name === 'IncorrectPasswordError') {
        console.log(error, info);
        req.flash('danger', 'Неверный пароль.');
      }
      if (info && info.name === 'IncorrectUsernameError') {
        console.log(error, info);
        req.flash('danger', 'Неверное имя пользователя.');
      }
      return res.redirect('/admin/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Вы успешно авторизированы!');
      return res.redirect('/admin/callback/all');
    });
  })(req, res, next);
  // } else {
  //   passport.authenticate('local', { session: false }, (err, user, info) => {
  //     if (err || !user) {
  //       if (info && info.name === 'IncorrectPasswordError') {
  //         return res.status(400).json({
  //           message: 'pass',
  //           user,
  //         });
  //       }
  //       if (info && info.name === 'IncorrectUsernameError') {
  //         return res.status(400).json({
  //           message: 'username',
  //           user,
  //         });
  //       }
  //     }

  //     req.logIn(user, { session: false }, (err) => {
  //       if (err) {
  //         res.send(err);
  //       }

  //       const token = jwt.sign(user.toJSON(), 'your_jwt_secret', {
  //         expiresIn: '7d', // 1 week
  //       });

  //       return res.json({ auth: true, token, user });
  //     });
  //   })(req, res, next);
  // }
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/admin');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('danger', 'Вам необходимо быть авторизованным');
  res.redirect('/admin/login');
};

exports.forgot = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No account with that email exists.');
    return res.redirect('/login');
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL,
  });
  req.flash('success', 'You have been emailed a password reset link.');
  // 4. redirect to login page
  res.redirect('/login');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // if there is a user, show the rest password form
  res.render('reset', { title: 'Reset your Password' });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next(); // keepit going!
    return;
  }
  req.flash('error', 'Passwords do not match!');
  res.redirect('back');
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash(
    'success',
    '💃 Nice! Your password has been reset! You are now logged in!',
  );
  res.redirect('/');
};
