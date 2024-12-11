import joi from 'joi';

// validate user registration
export const registerUserValidation = joi.object({
    name: joi.string().min(3).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
      }),
      email: joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please provide a valid email',
        'string.empty': 'Email is required',
      }),
      password: joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
      })
});
// validate user login
export const loginUserValidation = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please provide a valid email',
        'string.empty': 'Email is required',
    }),
    password: joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    })
});