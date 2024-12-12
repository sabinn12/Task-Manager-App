import { Request, Response } from 'express';
import { createTaskService, getAllTasksForAUserService } from '../services/taskService';

//  an interface to extend the Request type
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}


// Create task controller
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
       
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
            return;
        }

        const { title, description, deadline, priority } = req.body;

        const task = await createTaskService({
            title,
            description,
            deadline: new Date(deadline),
            priority,
            userId: Number(req.user.id),
        });

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while creating the task',
        });
    }
};

// get all tasks for a user controller

export const getAllTasksForAUser = async (req: Request, res: Response) => {
    try {
        const tasks = await getAllTasksForAUserService(req.params.id);
        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while getting all tasks for a user',
        });
    }
};







