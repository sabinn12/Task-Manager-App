import { Router } from 'express';
import { createBoardController, getBoardsWithTasksController } from '../controllers/boardController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createBoardValidationSchema } from '../schema/boardValidationSchema';
;

const router = Router();

// create board route
router.post('/create', authenticate,validateRequest(createBoardValidationSchema), createBoardController);

// get boards with tasks route
router.get("/", authenticate, getBoardsWithTasksController);

export default router;
