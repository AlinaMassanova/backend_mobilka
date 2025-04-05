const db = require('../config/db');

class GoalModel {
  static async create(userId, { habitId, startDate, endDate, targetCount }) {
    const query = `
      INSERT INTO goals (user_id, habit_id, start_date, end_date, target_count)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    return db.query(query, [userId, habitId, startDate, endDate, targetCount]);
  }

  static async getActive(userId) {
    const query = `
      SELECT * FROM goals 
      WHERE user_id = $1 AND is_active = TRUE
      ORDER BY created_at DESC`;
    return db.query(query, [userId]);
  }

  static async updateTick(goalId) {
    const query = `
      UPDATE goals 
      SET current_count = current_count + 1 
      WHERE id = $1 AND current_count < target_count
      RETURNING *`;
    return db.query(query, [goalId]);
  }
}

module.exports = GoalModel;
