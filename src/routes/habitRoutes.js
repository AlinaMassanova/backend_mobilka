const express = require('express');
const HabitController = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, HabitController.create);
router.get('/', authMiddleware, HabitController.getAll);

router.post('/:habitId/ticks/:date', authMiddleware, HabitController.toggleTick);

module.exports = router;