const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/test', (req, res) => {
  res.send('Server is working');
});

module.exports = router;
