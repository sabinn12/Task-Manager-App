import { Request, Response } from 'express';
import { createBoard, getBoardsWithTasksForUser, getBoards,  deleteBoardByIdService } from '../services/boardService';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

// Create board controller
export const createBoardController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.body;
    const userId = parseInt(req.user!.id, 10)

    const board = await createBoard({ name, userId });
    res.status(201).json({ message: 'Board created successfully', board });
  } catch (error : any) {
    res.status(400).json({ error: error.message });
  }
};



// Get boards with tasks controller
export const getBoardsWithTasksController = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const userId = Number(req.user?.id);
      const boards = await getBoardsWithTasksForUser(userId);
      res.status(200).json({
          success: true,
          data: boards,
      });
  } catch (error: any) {
      res.status(500).json({
          success: false,
          message: error.message || "An error occurred while fetching boards and tasks",
      });
 
    }
  };

 // Get all boards for authenticated user
export const getBoardsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const userId = Number(req.user?.id); // Get user ID from authenticated request
      const boards = await getBoards(userId);
      res.status(200).json({
          success: true,
          data: boards,
      });
  } catch (error: any) {
      res.status(500).json({
          success: false,
          message: error.message || "An error occurred while fetching boards",
      });
  }
};




// Delete board controller
export const deleteBoardById = async (req: Request, res: Response) => {
  try {
      const { boardId } = req.params;

      await deleteBoardByIdService(Number(boardId));

      res.status(200).json({
          success: true,
          message: 'Board deleted successfully',
      });
  } catch (error: any) {
      res.status(500).json({
          success: false,
          message: error.message || 'An error occurred while deleting the board',
      });
  }
};
 
