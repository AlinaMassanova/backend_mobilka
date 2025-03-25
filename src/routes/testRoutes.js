const express = require('express');
const TestController = require('../controllers/TestController');

const router = express.Router();

router.get('/test', TestController.getTestMessage);

module.exports = router;
