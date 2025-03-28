const HabitService = require('../services/habitService');

const createHabit = async (req, res, next) => {
  try {
    const { name, color, image } = req.body;
    const userId = req.user.id;
    if (!name || !color) {
      return res.status(400).json({ error: 'Name and color are required' });
    }

    const newHabit = await HabitService.createHabit(userId, name, color, image);
    res.status(201).json(newHabit);
  } catch (error) {
    next(error);
  }
};

module.exports = { createHabit };