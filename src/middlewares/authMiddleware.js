const TokenModel = require('../models/TokenModel');

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ error: 'Не авторизован: отсутствует токен' });
    }

    const result = await TokenModel.findByToken(token);
    if (!result.rows.length) {
      return res.status(401).json({ error: 'Не авторизован: недействительный токен' });
    }

    const tokenData = result.rows[0];
    if (new Date(tokenData.expires_at) < new Date()) {
      console.log(`Token expired at: ${tokenData.expires_at}`);
      return res.status(401).json({ error: 'Токен просрочен' });
    }

    req.userId = tokenData.user_id;
    return next();
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = authMiddleware;
