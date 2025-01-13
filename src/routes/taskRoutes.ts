import { Router } from 'express';
import { createTask, getAllTasksForAUser, updateTaskById, deleteTaskById, updateTaskStatus } from '../controllers/taskController';
import { validateRequest} from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authMiddleware';
import { authorizeTaskAccess } from '../middlewares/taskMiddleware';
import { createTaskValidationSchema, updateTaskValidationSchema, updateTaskStatusValidationSchema } from '../schema/taskValidationSchema';


const router = Router();
// create task route
router.post('/create', authenticate, validateRequest(createTaskValidationSchema), createTask);

// get all tasks for a user route
router.get('/', authenticate,  getAllTasksForAUser);

// update task by id route  
router.put('/:id', authenticate, authorizeTaskAccess, validateRequest(updateTaskValidationSchema),  updateTaskById);

// update task status route  

router.patch('/update-status', authenticate, authorizeTaskAccess, validateRequest(updateTaskStatusValidationSchema), updateTaskStatus);


// delete task by id route  
router.delete('/:id', authenticate, authorizeTaskAccess, deleteTaskById);

export default router;