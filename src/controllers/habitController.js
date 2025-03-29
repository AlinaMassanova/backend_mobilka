const { createSchema } = require('../validators/habitValidator');
const HabitService = require('../services/habitService');

class HabitController {
  static async create(req, res) {
    const { error } = createSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    try {
      const habit = await HabitService.createHabit(req.userId, req.body);
      res.status(201).json(habit.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const habits = await HabitService.getUserHabits(req.userId);
      res.json(habits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async toggleTick(req, res) {
    try {
      const { habitId, date } = req.params;
      const tick = await HabitService.toggleTick(habitId, date);
      res.json(tick.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HabitController;