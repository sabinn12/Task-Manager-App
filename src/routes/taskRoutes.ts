import { Router } from 'express';
import { createTask, getAllTasksForAUser } from '../controllers/taskController';
import { validateRequest} from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authMiddleware';
import { createTaskValidationSchema } from '../schema/taskValidationSchema';


const router = Router();
// create task route
router.post('/create', validateRequest(createTaskValidationSchema), authenticate, createTask);

// get all tasks for a user route
router.get('/get/:id', getAllTasksForAUser);

export default router;