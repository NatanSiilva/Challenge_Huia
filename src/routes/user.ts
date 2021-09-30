import { Router } from 'express';
import UserController from '../controllers/UserController';
import authentication from '../middleware/auth';


const userRoutes = Router();
const userController = new UserController();

// userRoutes.use(authentication)

userRoutes.get('/', authentication, userController.index);

userRoutes.post('/', userController.create);
userRoutes.patch('/:id', authentication, userController.enable);

export default userRoutes;
