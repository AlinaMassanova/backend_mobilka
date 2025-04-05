const express = require('express');
const GoalController = require('../controllers/GoalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, GoalController.create);
router.get('/active', authMiddleware, GoalController.getActive);
router.patch('/:id/tick', authMiddleware, GoalController.updateTick);

module.exports = router;
