import { Router } from 'express';
import LotController from '../controllers/LotController';

const lotRoutes = Router();
const userController = new LotController();

// userRoutes.use(authentication)
lotRoutes.get('/', userController.index);
lotRoutes.post('/', userController.create);
lotRoutes.delete('/id/:id', userController.delete);

export default lotRoutes;
