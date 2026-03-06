const express = require('express');
const { create, getAll, update } = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { eventRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.post('/', eventRules, handleValidation, create);
router.get('/', authMiddleware, getAll);
router.patch('/:id', authMiddleware, update);

module.exports = router;
