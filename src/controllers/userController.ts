import { Request, Response } from 'express';
import { registerUser, loginUserService, getAllUsersService, getUserByIdService, deleteUserByIdService } from '../services/userService';


interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}


// Register user controller

export const registerUserController = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Call service to handle registration
      const user = await registerUser(name, email, password, role);
  
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

// Login user controller

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


// get all users controller

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while fetching users',
        });
    }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while fetching user by id',
        });
    }
};


// Delete user profile controller


export const deleteUserProfileController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Get user ID from the authenticated request
     
        // Call service to delete the user
        const deletedUser = await deleteUserByIdService(userId as string);

        res.status(200).json({
            success: true,
            message: 'User profile deleted successfully',
            data: deletedUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while deleting the user profile',
        });
    }
};

