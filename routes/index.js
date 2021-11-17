const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductCategory = mongoose.model('ProductCategory');
const Product = mongoose.model('Product');
const MainSlider = mongoose.model('MainSlider');
const Sale = mongoose.model('Sale');
const Service = mongoose.model('Service');
const Review = mongoose.model('Review');
const About = mongoose.model('About');
const { addCallback } = require('../controllers/callbackForm.controller');
const { landing } = require('../controllers/landing.controller')

router.post('/form', addCallback);

router.get('/', landing);
router.get('/checkout', (req, res) => {
  res.render('checkout')
});
router.get('/terms-of-sale', (req, res) => {
  res.render('terms')
});
router.get('/thanks', (req, res) => {
  res.render('thanks')
});
router.get('/ru', (req, res) => {
  res.cookie('i18n', 'ru');
  res.setLocale('ru');
  res.redirect('back');
});

router.get('/ua', (req, res) => {
  res.cookie('i18n', 'ua');
  res.setLocale('ua');
  res.redirect('back');
});

module.exports = router;
