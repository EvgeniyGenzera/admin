const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderCallbacks,
  renderSingleCallback,
  deleteCallback,
} = require('../controllers/callbackForm.controller');

router.all('/', isLoggedIn);

router.get('/all', isLoggedIn, catchErrors(renderCallbacks));
router.get('/add/:id', isLoggedIn, catchErrors(renderSingleCallback));
router.get('/delete/:id', isLoggedIn, catchErrors(deleteCallback));

module.exports = router;
