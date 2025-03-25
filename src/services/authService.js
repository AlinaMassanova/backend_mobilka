class AuthService {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password); 
      res.status(201).json({ message: 'Пользователь зарегистрирован', userId: result.id });
    } catch (error) {
      next(error);
    }
  }

  static async login(email, password) {
    try {
      const result = await UserModel.findByEmail(email);
      if (!result || result.rows.length === 0) {
        throw new Error('Неверный email или пароль');
      }

      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Неверный email или пароль');
      }

      const token = crypto.randomBytes(64).toString('hex');
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await TokenModel.createToken(user.id, token, expiresAt);

      return { userId: user.id, token };
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw new Error('Ошибка входа');
    }
  }
}

module.exports = AuthService;
