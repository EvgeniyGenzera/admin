const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderProducts,
  renderAddNewProduct,
  addNewProduct,
  renderEditProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { upload, resize } = require('../controllers/upload.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderProducts));
router.get('/add', renderAddNewProduct);
router.post('/add', upload, catchErrors(resize), catchErrors(addNewProduct));
router.get('/add/:id', catchErrors(renderEditProduct));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(editProduct));
router.get('/delete/:id', catchErrors(deleteProduct));

module.exports = router;
