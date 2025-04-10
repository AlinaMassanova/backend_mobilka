const GoalModel = require('../models/GoalModel');

class GoalController {
  static async create(req, res) {
    try {
      console.log('POST /goals с телом:', req.body);
      const { habit_id, start_date, end_date, target_count } = req.body;
      
      const goal = await GoalModel.create(req.userId, {
        habitId: habit_id,
        startDate: start_date,
        endDate: end_date,
        targetCount: target_count,
      });

      console.log('Успешло вставили:' , goal.rows[0]);
      res.status(201).json(goal.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getActive(req, res) {
    try {
      const goals = await GoalModel.getActive(req.userId);
      res.json(goals.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTick(req, res) {
    try {
      const { id } = req.params;
      const updatedGoal = await GoalModel.updateTick(id);
      res.json(updatedGoal.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GoalController;
