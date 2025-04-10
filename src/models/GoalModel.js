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
      SELECT 
        g.id,
        g.user_id,
        g.habit_id,
        g.start_date,
        g.end_date,
        g.target_count,
        g.current_count,
        g.is_active,
        g.created_at,
        row_to_json(h) AS habit
      FROM goals g
      JOIN habits h ON g.habit_id = h.id
      WHERE g.user_id = $1 AND g.is_active = TRUE
      ORDER BY g.created_at DESC
    `;
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
