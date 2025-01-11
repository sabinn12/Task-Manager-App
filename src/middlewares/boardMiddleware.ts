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
export const authorizeBoardAccess = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id: userId } = req.user || {};
    const boardId = req.params.boardId; // Ensure correct parameter name
  
    try {
      // Ensure both `userId` and `boardId` are valid
      if (!userId || !boardId) {
      res.status(400).json({
          success: false,
          message: 'User ID or Board ID missing',
        });
        return;
      }
  
      // Fetch the board and verify ownership
      const board = await prisma.board.findUnique({
        where: { id: Number(boardId) },
        select: { userId: true },
      });
  
      if (!board) {
         res.status(404).json({
          success: false,
          message: 'Board not found',
        });
        return;
      }
  
      if (board.userId !== Number(userId)) {
         res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have access to this board',
        });
        return;
      }
  
      next(); // Proceed if the user owns the board
    } catch (error) {
      console.error('Error in authorizeBoardAccess:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  