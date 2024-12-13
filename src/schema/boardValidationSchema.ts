import Joi from 'joi';

export const createBoardValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Board name should be a type of text',
    'string.min': 'Board name must be at least 3 characters long',
    'any.required': 'Board name is required',
  }),
});
