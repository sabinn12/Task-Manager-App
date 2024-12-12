import { Request, Response } from 'express';
import { createTaskService, getAllTasksForAUserService, updateTaskByIdService } from '../services/taskService';

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
        const { title, description, deadline, priority } = req.body;

        const task = await createTaskService({
            title,
            description,
            deadline: new Date(deadline),
            priority,
            userId: Number(req.user?.id),
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


// update task by id controller

export const updateTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, priority } = req.body;
        const updatedTask = await updateTaskByIdService(id, title, description, deadline, priority);
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while updating task by id',
        });
    }
};







