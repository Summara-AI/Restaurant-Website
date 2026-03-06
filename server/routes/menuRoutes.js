const express = require('express');
const { getAll, getByCategory, create, update, remove } = require('../controllers/menuController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { menuItemRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.get('/', getAll);
router.get('/:category', getByCategory);
router.post('/', authMiddleware, menuItemRules, handleValidation, create);
router.put('/:id', authMiddleware, menuItemRules, handleValidation, update);
router.delete('/:id', authMiddleware, remove);

module.exports = router;
