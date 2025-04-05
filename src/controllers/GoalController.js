const GoalModel = require('../models/GoalModel');

class GoalController {
  static async create(req, res) {
    try {
      const { habitId, startDate, endDate, targetCount } = req.body;
      const goal = await GoalModel.create(req.userId, { habitId, startDate, endDate, targetCount });
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
