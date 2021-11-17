const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');
const { upload, resize } = require('../controllers/upload.controller');
const {
  render,
  renderAddNewSlide,
  addNewSlide,
  renderEditSlide,
  editSlide,
  deleteSlide,
} = require('../controllers/banner.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(render));
router.get('/add', renderAddNewSlide);
router.post('/add', upload, catchErrors(resize), catchErrors(addNewSlide));
router.get('/add/:id', catchErrors(renderEditSlide));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(editSlide));
router.get('/delete/:id', catchErrors(deleteSlide));

module.exports = router;
