import { Router } from 'express';
import UserController from '../controllers/UserController';
// import authentication from '../middleware/auth';

const userRoutes = Router();
const userController = new UserController();

// userRoutes.use(authentication)

userRoutes.post('/', userController.create);

export default userRoutes;
