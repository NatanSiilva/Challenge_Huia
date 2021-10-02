import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const orderRoutes = Router();
const orderController = new OrdersController();

orderRoutes.post('/', orderController.create);

export default orderRoutes;
