import express from 'express';
import { registerUserController, loginUser, getAllUsers, getUserById, deleteUserProfileController} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation, loginUserValidation } from '../schema/userValidationsSchema';
import { authenticate, checkAdminSecret } from '../middlewares/authMiddleware';


const router = express.Router();

// User registration
router.post('/register', validateRequest(registerUserValidation), checkAdminSecret, registerUserController);

// User login
router.post('/login',  validateRequest(loginUserValidation), loginUser);

// get all users
router.get('/', authenticate,  getAllUsers);

// get user by id
router.get('/:id', getUserById);

// DELETE /users/profile - Delete own profile
router.delete('/profile', authenticate, deleteUserProfileController);



export default router;
