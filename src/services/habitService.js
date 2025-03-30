const db = require('../config/db');
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
    console.log('\n[DEBUG] Starting addDefaultHabits for user:', userId);

    const defaultHabits = [
      { name: 'Fitness', color: '#f8c8dc', imageUrl: '/public/default-habit-images/fitness.svg' },
      { name: 'Reading', color: '#f5d0c8', imageUrl: '/public/default-habit-images/reading.svg' },
      { name: 'Meditation', color: '#f0e6ef', imageUrl: '/public/default-habit-images/meditation.svg' },
      { name: 'Hydration', color: '#e6f0c2', imageUrl: '/public/default-habit-images/hydration.svg' },
      { name: 'Relaxation', color: '#d8e2dc', imageUrl: '/public/default-habit-images/relaxation.svg' },
      { name: 'Coding', color: '#c8e6bf', imageUrl: '/public/default-habit-images/coding.svg' },
      { name: 'Yoga', color: '#b5e4fa', imageUrl: '/public/default-habit-images/yoga.svg' },
      { name: 'Music', color: '#a7c7e7', imageUrl: '/public/default-habit-images/music.svg' },
      { name: 'Study', color: '#d0bfff', imageUrl: '/public/default-habit-images/study.svg' },
      { name: 'Walking', color: '#e9c4ef', imageUrl: '/public/default-habit-images/walking.svg' },
    ];
    console.log('[DEBUG] Default habits data:', JSON.stringify(defaultHabits, null, 2));


    for (const habit of defaultHabits) {
      await HabitModel.create(userId, habit);
    }
  }

  static async toggleTick(habitId, date) {
    return HabitModel.setTick(habitId, date);
  }

  static async softDeleteHabit(habitId, userId) {
    const query = `
      UPDATE habits 
      SET is_deleted = TRUE 
      WHERE id = $1 AND user_id = $2
      RETURNING *`;

    const result = await db.query(query, [habitId, userId]);
    return result.rows[0];
  }
}

module.exports = HabitService;
