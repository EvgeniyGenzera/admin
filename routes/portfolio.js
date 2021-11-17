const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderPortfolios,
  renderAddNewPortfolio,
  addNewPortfolio,
  renderEditPortfolio,
  editPortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');
const {
  upload,
  resize,
} = require('../controllers/upload.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderPortfolios));
router.get('/add', renderAddNewPortfolio);
router.post('/add', upload, catchErrors(resize), catchErrors(addNewPortfolio));
router.get('/add/:id', catchErrors(renderEditPortfolio));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(editPortfolio));
router.get('/delete/:id', catchErrors(deletePortfolio));

module.exports = router;
