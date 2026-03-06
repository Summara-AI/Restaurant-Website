const express = require('express');
const { login, logout, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { loginRules, handleValidation } = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginRules, handleValidation, login);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

module.exports = router;
