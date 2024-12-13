import { Request, Response } from 'express';
import { createBoard } from '../services/boardService';

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


