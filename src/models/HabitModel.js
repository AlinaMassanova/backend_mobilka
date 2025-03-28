const pool = require('../config/db');

class HabitModel {
  static async createHabit(userId, name, color, image) {
    const query = `
      INSERT INTO habits (user_id, name, color, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userId, name, color, image];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = HabitModel;