const HabitModel = require('../models/HabitModel');

class HabitService {
  static async createHabit(userId, name, color, image) {
    return await HabitModel.createHabit(userId, name, color, image);
  }
}

module.exports = HabitService;