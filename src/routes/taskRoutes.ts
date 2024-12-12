import { Router } from 'express';
import { createTask } from '../controllers/taskController';
import { validateRequest} from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authMiddleware';
import { createTaskValidationSchema } from '../schema/taskValidationSchema';


const router = Router();

router.post('/create', validateRequest(createTaskValidationSchema), authenticate, createTask);

export default router;