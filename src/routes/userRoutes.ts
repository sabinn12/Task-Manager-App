import express from 'express';
import { registerUserController, loginUser, getAllUsers, getUserById, deleteUserProfileController, changePasswordController} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation, loginUserValidation, changePasswordValidation } from '../schema/userValidationsSchema';
import { authenticate, checkAdminSecret, checkUserRole } from '../middlewares/authMiddleware';


const router = express.Router();

// User registration
router.post('/register', validateRequest(registerUserValidation), checkAdminSecret, registerUserController);

// User login
router.post('/login',  validateRequest(loginUserValidation), loginUser);

// get all users
router.get('/', authenticate, checkUserRole('ADMIN'),  getAllUsers);

// get user by id
router.get('/:id', getUserById);

// DELETE /users/profile - Delete own profile
router.delete('/profile', authenticate, deleteUserProfileController);

// change password
 router.put('/change-password',validateRequest(changePasswordValidation), authenticate, changePasswordController);



export default router;
