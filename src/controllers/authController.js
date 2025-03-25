class AuthController {
  static async register(req, res) {
    res.status(200).json({ message: 'Stub: Register endpoint' });
  }

  static async login(req, res) {
    res.status(200).json({ message: 'Stub: Login endpoint' });
  }
}

module.exports = AuthController;
