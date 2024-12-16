import { Router } from 'express';
import { createBoardController, getBoardsWithTasksController, getBoardsController, deleteBoardById } from '../controllers/boardController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createBoardValidationSchema } from '../schema/boardValidationSchema';
import { authorizeBoardAccess } from '../middlewares/boardMiddleware';




const router = Router();

// create board route
router.post('/create', authenticate,  validateRequest(createBoardValidationSchema), createBoardController);

// get boards with tasks route
router.get("/withTasks", authenticate, authorizeBoardAccess, getBoardsWithTasksController);

// get boards route
router.get("/all",authenticate, authorizeBoardAccess, getBoardsController);

// Delete board route
router.delete('/:boardId', authenticate, authorizeBoardAccess, deleteBoardById);



export default router;
