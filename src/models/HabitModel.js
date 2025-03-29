const db = require('../config/db');

class HabitModel {
  static async create(userId, { name, color, imageUrl = null }) {
    const query = `
      INSERT INTO habits (user_id, name, color, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    return db.query(query, [userId, name, color, imageUrl]);
  }

  static async getAll(userId) {
    const query = `
      SELECT * FROM habits 
      WHERE user_id = $1 AND is_deleted = FALSE
      ORDER BY created_at DESC`;
    return db.query(query, [userId]);
  }

  static async delete(habitId) {
    const query = `
      UPDATE habits 
      SET is_deleted = TRUE 
      WHERE id = $1 
      RETURNING *`;
    return db.query(query, [habitId]);
  }

  static async setTick(habitId, date) {
    const query = `
      INSERT INTO habit_ticks (habit_id, date, is_completed)
      VALUES ($1, $2, TRUE)
      ON CONFLICT (habit_id, date)
      DO UPDATE SET is_completed = NOT habit_ticks.is_completed
      RETURNING *`;
    return db.query(query, [habitId, date]);
  }

  static async updateNote(habitId, content) {
    const query = `
      INSERT INTO habit_notes (habit_id, content)
      VALUES ($1, $2)
      ON CONFLICT (habit_id)
      DO UPDATE SET content = $2, updated_at = NOW()
      RETURNING *`;
    return db.query(query, [habitId, content]);
  }

  static async getTicks(habitId) {
    const query = 'SELECT * FROM habit_ticks WHERE habit_id = $1';
    return db.query(query, [habitId]);
  }
}

module.exports = HabitModel;