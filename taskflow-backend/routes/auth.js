const express    = require('express');
const router     = express.Router();
const protect    = require('../middleware/authMiddleware');
const {
  register,
  login,
  getMe,
} = require('../controllers/authController');

// POST /auth/register — naya user
router.post('/register', register);

// POST /auth/login — login karo
router.post('/login', login);

// GET /auth/me — apna profile (protected)
router.get('/me', protect, getMe);

module.exports = router;