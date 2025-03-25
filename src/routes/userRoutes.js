const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
