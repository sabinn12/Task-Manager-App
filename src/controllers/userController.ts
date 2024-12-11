import { Request, Response } from 'express';
import { registerUser, loginUserService } from '../services/userService';

// Register user controller

export const registerUserController = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
  
      // Call service to handle registration
      const user = await registerUser(name, email, password);
  
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

// Login user controlle

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await loginUserService(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


