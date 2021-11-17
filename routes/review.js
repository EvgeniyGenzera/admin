const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');
const {
  renderReviews,
  renderAddNewReview,
  addNewReview,
  renderEditReview,
  editReview,
  deleteReview,
} = require('../controllers/review.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderReviews));
router.get('/add', renderAddNewReview);
router.post('/add', catchErrors(addNewReview));
router.get('/add/:id', catchErrors(renderEditReview));
router.post('/add/:id', catchErrors(editReview));
router.get('/delete/:id', catchErrors(deleteReview));

module.exports = router;
