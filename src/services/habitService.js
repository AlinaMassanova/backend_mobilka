const HabitModel = require('../models/HabitModel');

class HabitService {
  static async createHabit(userId, habitData) {
    return HabitModel.create(userId, habitData);
  }

  static async getUserHabits(userId) {
    let habits = await HabitModel.getAll(userId);

    if (habits.rows.length === 0) {
      await this.addDefaultHabits(userId);
      habits = await HabitModel.getAll(userId);
    }

    const habitsWithTicks = await Promise.all(
      habits.rows.map(async (habit) => {
        const ticks = await HabitModel.getTicks(habit.id);
        return { ...habit, ticks: ticks.rows };
      }),
    );

    return habitsWithTicks;
  }

  static async addDefaultHabits(userId) {
    const defaultHabits = [
      { name: 'Fitness', color: '#f8c8dc' },
      { name: 'Reading', color: '#f5d0c8' },
      { name: 'Meditation', color: '#f0e6ef' },
      { name: 'Hydration', color: '#e6f0c2' },
      { name: 'Relaxation', color: '#d8e2dc' },
      { name: 'Coding', color: '#c8e6bf' },
      { name: 'Yoga', color: '#b5e4fa' },
      { name: 'Music', color: '#a7c7e7' },
      { name: 'Study', color: '#d0bfff' },
      { name: 'Walking', color: '#e9c4ef' },
    ];

    for (const habit of defaultHabits) {
      await HabitModel.create(userId, habit);
    }
  }

  static async toggleTick(habitId, date) {
    return HabitModel.setTick(habitId, date);
  }
}

module.exports = HabitService;
