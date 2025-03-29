const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
    .messages({
      'string.empty': 'Habit name cannot be empty',
      'string.min': 'Habit name must be at least 2 characters',
      'any.required': 'Habit name is required',
    }),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).required().messages({
    'string.pattern.base': 'Color must be a valid hex code (e.g. #FF0000)',
  }),
  imageUrl: Joi.string().uri().allow(null),
});

module.exports = { createSchema };