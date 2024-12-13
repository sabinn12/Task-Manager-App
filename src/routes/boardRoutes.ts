import { Router } from 'express';
import { createBoardController } from '../controllers/boardController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createBoardValidationSchema } from '../schema/boardValidationSchema';
;

const router = Router();

// create board route
router.post('/create', authenticate,validateRequest(createBoardValidationSchema), createBoardController);

export default router;
