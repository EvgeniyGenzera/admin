const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderServices,
  renderAddNewService,
  addNewService,
  renderEditService,
  editService,
  deleteService,
} = require('../controllers/service.controller');
const {
  upload,
  resize,
} = require('../controllers/upload.controller');

router.all('*', isLoggedIn);

router.get('/all', catchErrors(renderServices));
router.get('/add', renderAddNewService);
router.post('/add', upload, catchErrors(resize), catchErrors(addNewService));
router.get('/add/:id', catchErrors(renderEditService));
router.post('/add/:id', upload, catchErrors(resize), catchErrors(editService));
router.get('/delete/:id', catchErrors(deleteService));

module.exports = router;
