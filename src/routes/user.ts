import isAuthenticated from '../middleware/isAuthenticated';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

// userRoutes.use(isAuthenticated);

userRoutes.get('/', isAuthenticated, userController.index);
userRoutes.post('/', userController.create);
userRoutes.delete('/id/:id', isAuthenticated, userController.delete);

export default userRoutes;
