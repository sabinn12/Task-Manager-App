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
    boardId: Joi.number().required().messages({
        'number.base': 'Board ID should be a type of number',
        'number.empty': 'Board ID is required',
    }),
    
    
    
});

// update task validation schema
export const updateTaskValidationSchema = Joi.object({
    title: Joi.string().min(3).optional().messages({
      'string.base': 'Title should be a type of text',
      'string.min': 'Title must be at least 3 characters long',
    }),
    description: Joi.string().min(3).optional().messages({
      'string.base': 'Description should be a type of text',
      'string.min': 'Description must be at least 3 characters long',
    }),
    deadline: Joi.date().optional().messages({
      'date.base': 'Deadline should be a type of date',
    }),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional().messages({
      'string.base': 'Priority should be a type of text',
      'string.valid': 'Priority must be one of the following: Low, Medium, High',
    }),
    boardId: Joi.number().optional().messages({
      'number.base': 'Board ID should be a type of number',
      'number.empty': 'Board ID is required',
    }),
  });
  


// update task status validation schema
export const updateTaskStatusValidationSchema = Joi.object({
    taskId: Joi.number().required().messages({
        'number.base': 'Task ID should be a type of number',
        'number.empty': 'Task ID is required',
    }),
    status: Joi.string().valid('To Do', 'In Progress', 'Completed').required().messages({
        'string.base': 'Status should be a type of text',
        'string.valid': 'Status must be one of the following: To Do, In Progress, Completed',
    }),
});


