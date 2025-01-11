import { Router } from 'express';
import { createBoardController, getBoardsWithTasksController, getBoardsController, updateBoardNameController, deleteBoardById } from '../controllers/boardController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createBoardValidationSchema, updateBoardValidationSchema } from '../schema/boardValidationSchema';
import { authorizeBoardAccess } from '../middlewares/boardMiddleware';

const router = Router();

// create board route
router.post('/create', authenticate, validateRequest(createBoardValidationSchema), createBoardController);

// get boards with tasks route
router.get("/withTasks", authenticate, getBoardsWithTasksController);

// get boards route
router.get("/all",authenticate, getBoardsController);

// update board name route
router.put('/:boardId', authenticate, authorizeBoardAccess, validateRequest(updateBoardValidationSchema), updateBoardNameController);

// Delete board route
router.delete('/:boardId', authenticate, deleteBoardById);



export default router;
