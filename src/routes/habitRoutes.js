const express = require('express');
const upload = require('../middlewares/upload');
const HabitController = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  HabitController.create,
);

router.get('/', authMiddleware, HabitController.getAll);

router.post('/:habitId/ticks/:date', authMiddleware, HabitController.toggleTick);

router.delete('/:id', authMiddleware, HabitController.delete);

module.exports = router;
