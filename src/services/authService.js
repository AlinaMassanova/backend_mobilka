class AuthService {
  static async register(name, email, password) {
    return { id: 1, name, email };
  }

  static async login(email, password) {
    return { userId: 1, token: 'stub-token' };
  }
}

module.exports = AuthService;
