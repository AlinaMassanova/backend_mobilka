const TestService = require('../services/TestService');

class TestController {
  static async getTestMessage(req, res) {
    try {
      const message = TestService.getMessage();
      res.status(200).json({ message });
    } catch (error) {
      console.error('Ошибка в TestController:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = TestController;
