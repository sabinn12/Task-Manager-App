import { Router } from 'express';
import { createBoardController, getBoardsWithTasksController, getBoardsController } from '../controllers/boardController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createBoardValidationSchema } from '../schema/boardValidationSchema';
;

const router = Router();

// create board route
router.post('/create', authenticate,validateRequest(createBoardValidationSchema), createBoardController);

// get boards with tasks route
router.get("/withTasks", authenticate, getBoardsWithTasksController);

// get boards route
router.get("/all", getBoardsController);

export default router;
