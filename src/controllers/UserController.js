const UserModel = require('../models/UserModel');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error('Ошибка при получении профиля:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = UserController;
