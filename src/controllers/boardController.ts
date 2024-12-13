import { Request, Response } from 'express';
import { createBoard, getBoardsWithTasksForUser, getBoards } from '../services/boardService';

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
    const userId = req.user?.id ? parseInt(req.user.id, 10) : undefined;

    if(!userId){
         res.status(400).json({ error: "User ID is required." });
         return;
    }

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

      if (!userId) {
       res.status(400).json({ message: "User ID is required" });
       return;
      }

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

  // get boards
  export const getBoardsController = async (req: Request, res: Response) => {
    try {
        const boards = await getBoards();
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