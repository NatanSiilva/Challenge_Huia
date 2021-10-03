import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const orderRoutes = Router();
const orderController = new OrdersController();

orderRoutes.get('/', orderController.index);
orderRoutes.get('/id/:id', orderController.show);
orderRoutes.get('/report', orderController.indexReport);
orderRoutes.post('/', orderController.create);

export default orderRoutes;
