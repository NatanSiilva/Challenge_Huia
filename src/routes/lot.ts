import { Router } from 'express';
import LotController from '../controllers/LotController';
import isAuthenticated from '../middleware/isAuthenticated';

const lotRoutes = Router();
const userController = new LotController();

lotRoutes.use(isAuthenticated);

lotRoutes.get('/', userController.index);
lotRoutes.post('/', userController.create);
lotRoutes.delete('/id/:id', userController.delete);

export default lotRoutes;
