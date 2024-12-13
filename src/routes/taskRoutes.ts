import { Router } from 'express';
import { createTask, getAllTasksForAUser, updateTaskById, deleteTaskById, updateTaskStatus } from '../controllers/taskController';
import { validateRequest} from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authMiddleware';
import { authorizeTaskAccess } from '../middlewares/taskMiddleware';
import { createTaskValidationSchema, updateTaskValidationSchema } from '../schema/taskValidationSchema';


const router = Router();
// create task route
router.post('/create', authenticate, validateRequest(createTaskValidationSchema), createTask);

// get all tasks for a user route
router.get('/:id', getAllTasksForAUser);

// update task by id route  
router.put('/update/:id', authenticate, authorizeTaskAccess, validateRequest(updateTaskValidationSchema),  updateTaskById);

// update task status route  

router.put('/update-status', authenticate, updateTaskStatus);


// delete task by id route  
router.delete('/:id', authenticate, authorizeTaskAccess, deleteTaskById);

export default router;