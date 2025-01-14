import express from 'express';
import { registerUserController, loginUser, getAllUsers, getUserById, deleteUserProfileController, updateUserProfile, changePasswordController} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation, loginUserValidation, updateUserValidation, changePasswordValidation } from '../schema/userValidationsSchema';
import { authenticate, checkAdminSecret, checkUserRole } from '../middlewares/authMiddleware';


const router = express.Router();

// User registration
router.post('/register', validateRequest(registerUserValidation), checkAdminSecret, registerUserController);

// User login
router.post('/login',  validateRequest(loginUserValidation), loginUser);

// get all users
router.get('/',   getAllUsers);

// get user by id
router.get('/:id', getUserById);

// change password
router.put('/change-password',validateRequest(changePasswordValidation), authenticate, changePasswordController);

 

// Update user details
router.put('/own-profile', authenticate, validateRequest(updateUserValidation), updateUserProfile);


// DELETE 
router.delete('/profile', authenticate, deleteUserProfileController);



export default router;
