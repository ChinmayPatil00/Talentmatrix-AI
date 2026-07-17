const express = require('express');
const router = express.Router();

// 1. Import your controllers
const { registerUser, loginUser } = require('../controllers/authController');

// 2. FIXED PATH: Pointing directly inside the controllers/middleware directory
const { protect } = require('../controllers/middleware/authMiddleware');

// 3. Define public auth endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// 4. Define protected user profile endpoint
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Secured private route accessed successfully!",
    user: req.user
  });
});

module.exports = router;