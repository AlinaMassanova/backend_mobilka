const UserModel = require('../models/UserModel');
const TokenModel = require('../models/TokenModel');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 

async function register(req, res) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser.rows.length) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser.rows[0] });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

async function login(req, res) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const userResult = await UserModel.findByEmail(email);
    if (!userResult.rows.length) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = userResult.rows[0];

    // ✅ Сравнение пароля с использованием bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // ✅ Генерация токена и установка в cookies
    const token = crypto.randomBytes(64).toString('hex');
    await TokenModel.createToken(user.id, token, expiresAt);
    res.cookie('authToken', token, { httpOnly: true, sameSite: "None", secure: true });

    res.status(200).json({ message: 'Вход выполнен' });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { register, login };
