const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { catchErrors } = require('../handlers/errorHandlers');
const { renderMainPage } = require('../controllers/main.controller');
const aboutRoutes = require('./about');
const bannerRoutes = require('./banner');
const portfolioRoutes = require('./portfolio');
const serviceRoutes = require('./service');
const callbackRoutes = require('./callback');
const products = require('./product');
const productCategory = require('./product-category');
const sale = require('./sale');
const review = require('./review');
const landing = require('./landing')

router.use('/about', aboutRoutes);
router.use('/banner', bannerRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/services', serviceRoutes);
router.use('/callback', callbackRoutes);
router.use('/products', products);
router.use('/product-categories', productCategory);
router.use('/sale', sale);
router.use('/review', review);
router.use('/landing', landing);

router.get('/', authController.isLoggedIn, renderMainPage);

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('back');
    return;
  }
  res.render('admin/login');
});

router.get('/login', userController.loginForm);
router.post('/login', catchErrors(authController.login));
router.get('/register', userController.registerForm);
router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('back');
    return;
  }
  res.redirect('/login');
});

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login,
);

router.get('/logout', authController.logout);

module.exports = router;
