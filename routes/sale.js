const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');
const { upload, resize } = require('../controllers/upload.controller');
const {
  renderSales,
  renderAddNewSale,
  addNewSale,
  renderEditSale,
  editSale,
  deleteSale,
} = require('../controllers/sale.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderSales));
router.get('/add', renderAddNewSale);
router.post('/add', upload, catchErrors(resize), catchErrors(addNewSale));
router.get('/add/:id', catchErrors(renderEditSale));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(editSale));
router.get('/delete/:id', catchErrors(deleteSale));

module.exports = router;
