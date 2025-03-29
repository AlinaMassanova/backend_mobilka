const { createSchema } = require('../validators/habitValidator');
const HabitService = require('../services/habitService');

class HabitController {
  static async create(req, res) {
    const { error: validationError } = createSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({
        error: validationError.details[0].message,
      });
    }

    try {
      const habit = await HabitService.createHabit(req.userId, req.body);
      return res.status(201).json(habit.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const habits = await HabitService.getUserHabits(req.userId);
      return res.json(habits);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async toggleTick(req, res) {
    try {
      const { habitId, date } = req.params;
      const tick = await HabitService.toggleTick(habitId, date);
      return res.json(tick.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = HabitController;
