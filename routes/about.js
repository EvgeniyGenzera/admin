const express = require('express');

const router = express.Router();

const { isLoggedIn } = require('../controllers/auth.controller');

const {
  render,
  update,
} = require('../controllers/about.controller');

router.get('/', isLoggedIn, render);
router.post('/', isLoggedIn, update);

module.exports = router;
