const express = require('express');
const { getAll, getBySlug, create, update, remove } = require('../controllers/blogController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { blogPostRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);
router.post('/', authMiddleware, blogPostRules, handleValidation, create);
router.put('/:id', authMiddleware, blogPostRules, handleValidation, update);
router.delete('/:id', authMiddleware, remove);

module.exports = router;
