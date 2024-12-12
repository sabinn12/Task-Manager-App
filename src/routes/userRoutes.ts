import express from 'express';
import { registerUserController, loginUser, getAllUsers} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation, loginUserValidation } from '../schema/userValidationsSchema';

const router = express.Router();

// User registration
router.post('/register', validateRequest(registerUserValidation), registerUserController);

// User login
router.post('/login', validateRequest(loginUserValidation), loginUser);

// get all users
router.get('/',  getAllUsers);





export default router;
