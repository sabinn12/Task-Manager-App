import express from 'express';
import { registerUserController, loginUser, getAllUsers, getUserById} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation, loginUserValidation } from '../schema/userValidationsSchema';

const router = express.Router();

// User registration
router.post('/register', validateRequest(registerUserValidation), registerUserController);

// User login
router.post('/login', validateRequest(loginUserValidation), loginUser);

// get all users
router.get('/',  getAllUsers);

// get user by id
router.get('/:id', getUserById);



export default router;
