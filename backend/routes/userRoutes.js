const express = require('express');
const router = express.Router();
const { initializeUserData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/initialize', protect, initializeUserData);

module.exports = router; 