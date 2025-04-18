const db = require('../config/db');

class TokenModel {
  static async createToken(userId, token, expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
    const query = `
      INSERT INTO tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3);
    `;
    return db.query(query, [userId, token, expiresAt]);
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM tokens WHERE user_id = $1;';
    return db.query(query, [userId]);
  }

  static async findByToken(token) {
    const query = 'SELECT * FROM tokens WHERE token = $1;';
    return db.query(query, [token]);
  }


  static async deleteToken(token) {
    try {
      const query = 'DELETE FROM tokens WHERE token = $1 RETURNING *';
      const result = await db.query(query, [token]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting token:', error);
      throw error;
    }
  }
}

module.exports = TokenModel;
