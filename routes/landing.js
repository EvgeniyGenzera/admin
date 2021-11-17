const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { isLoggedIn } = require('../controllers/auth.controller');

const {
  renderLandingSettings,
  upsertData,
  renderEdit,
  editData,
} = require('../controllers/landing.controller');
// const { upload, resize } = require('../controllers/upload.controller');

router.all('*', isLoggedIn);

router.get('/', catchErrors(renderEdit));
router.post('/edit', catchErrors(editData));
router.post('/add', catchErrors(upsertData));

module.exports = router;
