const express = require('express');
const { create, getAll, getById, update, remove, checkAvailability } = require('../controllers/reservationController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { reservationRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.post('/', reservationRules, handleValidation, create);
router.get('/availability', checkAvailability);
router.get('/', authMiddleware, getAll);
router.get('/:id', authMiddleware, getById);
router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

module.exports = router;
