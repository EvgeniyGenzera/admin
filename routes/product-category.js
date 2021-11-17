const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderCategories,
  renderAddNewCategory,
  addNewCategory,
  renderEditCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/productCategory.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderCategories));
router.get('/add', renderAddNewCategory);
router.post('/add', catchErrors(addNewCategory));
router.get('/add/:id', catchErrors(renderEditCategory));
router.post('/add/:id', catchErrors(editCategory));
router.get('/delete/:id', catchErrors(deleteCategory));

module.exports = router;
