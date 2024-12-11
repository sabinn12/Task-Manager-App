import express from 'express';
import { registerUserController } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerUserValidation } from '../schema/userValidationsSchema';

const router = express.Router();

router.post('/register', validateRequest(registerUserValidation), registerUserController);

export default router;
