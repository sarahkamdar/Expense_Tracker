const express = require('express');
const router = express.Router();
const { register, login, googleAuth } = require('../controllers/authController');

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Auth routes
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/google', asyncHandler(googleAuth));

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Auth route error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = router; 