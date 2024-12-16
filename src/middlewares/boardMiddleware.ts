import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

// Interface to extend Request type
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

// Authorization Middleware
export const authorizeBoardAccess = async ( req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    const { id: userId } = req.user || {};
    const boardId = req.params.id; // Board ID from request params

    try {
        // Fetch the board to verify ownership
        const board = await prisma.board.findUnique({
            where: { id: Number(boardId) },
            select: { userId: true }, // Retrieve only the userId for verification
        });

        if (!board) {
             res.status(404).json({ 
                success: false, 
                message: 'Board not found' 
            });
            return;
        }

        // Check if the board belongs to the authenticated user
        if (board.userId !== Number(userId)) {
             res.status(403).json({ 
                success: false, 
                message: 'Forbidden: You do not have access to this board' 
            });
            return;
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};
