const express = require('express');
const habitController = require('../controllers/habitController');
const habitService = require('../services/habitService');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    console.log("User in request:", req.user);
  
    const { name, color, image } = req.body;
  
    if (!name || !color) {
      return res.status(400).json({ error: 'Habit name and color are required' });
    }
  
    try {
      const habit = await habitService.createHabit(req.user.id, name, color, image);
      return res.status(201).json(habit);
    } catch (error) {
      console.error('Error creating habit:', error);
      return res.status(500).json({ error: 'Failed to create habit' });
    }
  });
  

router.post('/', habitController.createHabit);

module.exports = router;