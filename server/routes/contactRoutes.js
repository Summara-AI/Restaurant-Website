const express = require('express');
const { create, getAll } = require('../controllers/contactController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { contactRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.post('/', contactRules, handleValidation, create);
router.get('/', authMiddleware, getAll);

module.exports = router;
