import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '../middleware/isAuthenticated';

const orderRoutes = Router();
const orderController = new OrdersController();

orderRoutes.use(isAuthenticated);

orderRoutes.get('/', orderController.index);
orderRoutes.get('/id/:id', orderController.show);
orderRoutes.get('/report', orderController.indexReport);
orderRoutes.post('/', orderController.create);
orderRoutes.delete('/id/:id', orderController.delete);

export default orderRoutes;
