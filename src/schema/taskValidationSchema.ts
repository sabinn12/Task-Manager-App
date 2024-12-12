import Joi from 'joi';

// Task validation schema
export const createTaskValidationSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters long',
    }),
    description: Joi.string().min(3).required().messages({
        'string.base': 'Description should be a type of text',
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 3 characters long',
    }),
    deadline: Joi.date().required().messages({
        'date.base': 'Deadline should be a type of date',
        'date.empty': 'Deadline is required',
    }),
    priority: Joi.string().valid('Low', 'Medium', 'High').required().messages({
        'string.base': 'Priority should be a type of text',
        'string.empty': 'Priority is required',
        'string.valid': 'Priority must be one of the following: Low, Medium, High',
    }),
    
});