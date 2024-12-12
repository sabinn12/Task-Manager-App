import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

//  an interface to extend the Request type
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

// Authorization Middleware
export const authorizeTaskAccess = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const { id: userId } = req.user || {};
    const taskId = req.params.id; 

    if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        return;
    }

    try {
        // Fetch the task to verify ownership
        const task = await prisma.task.findUnique({
            where: { id: Number(taskId) },
            select: { userId: true }, 
        });

        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }

        if (task.userId !== Number(userId)) {
            res.status(403).json({ success: false, message: 'Forbidden: You do not have access to this task' });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};