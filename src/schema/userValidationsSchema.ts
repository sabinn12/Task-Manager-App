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
      }),
      role: joi.string().valid('USER', 'ADMIN').optional().messages({
        'string.base': 'Role should be a type of text',
        'string.empty': 'Role is required',
      }),
      secretKey: joi.string().optional().messages({
        'string.base': 'Secret key should be a type of text',
        'string.empty': 'Secret key is required',
      }),
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

// update user validation

export const updateUserValidation = joi.object({
  name: joi.string().min(3).optional().messages({
      'string.base': 'Name should be a type of text',
      'string.min': 'Name must be at least 3 characters long',
  }),
  email: joi.string().email().optional().messages({
      'string.base': 'Email should be a type of text',
      'string.email': 'Please provide a valid email',
  }),
  role: joi.string().valid('USER', 'ADMIN').optional().messages({
      'string.base': 'Role should be a type of text',
  }),
});


// change password validation

export const changePasswordValidation = joi.object({
  oldPassword: joi.string().min(6).required().messages({
      'string.base': 'Old password should be a type of text',
      'string.empty': 'Old password is required',
      'string.min': 'Old password must be at least 6 characters long',
  }),
  newPassword: joi.string().min(6).required().messages({
      'string.base': 'New password should be a type of text',
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 6 characters long',
  }),
  confirmPassword: joi.string().valid(joi.ref('newPassword')).required().messages({
      'any.only': 'New password and confirm password must match',
      'string.empty': 'Confirm password is required',
  }),
});
