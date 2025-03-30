const { createSchema } = require('../validators/habitValidator');
const HabitService = require('../services/habitService');

class HabitController {
  static async create(req, res) {
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const habitData = {
        ...req.body,
        imageUrl: req.file ? `/public/habit-images/${req.file.filename}` : null,
      };

      const habit = await HabitService.createHabit(req.userId, habitData);
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

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedHabit = await HabitService.softDeleteHabit(id, req.userId);

      if (!deletedHabit) {
        return res.status(404).json({ error: 'Habit not found' });
      }

      return res.json({
        message: 'Habit soft-deleted successfully',
        habit: deletedHabit,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = HabitController;
