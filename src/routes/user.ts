import { Router } from 'express';
import UserController from '../controllers/UserController';
// import authentication from '../middleware/auth';

const userRoutes = Router();
const userController = new UserController();

// userRoutes.use(authentication)

userRoutes.get('/', userController.index);
userRoutes.post('/', userController.create);
userRoutes.delete('/id/:id', userController.delete);

export default userRoutes;
