import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import isAuthenticated from '../middleware/isAuthenticated';

const productRoutes = Router();
const userController = new ProductController();

productRoutes.use(isAuthenticated);

productRoutes.get('/', userController.index);
productRoutes.get('/id/:lot_id', userController.indexLotProduct);
productRoutes.get('/id/:id/prod', userController.show);
productRoutes.put('/id/:id', userController.update);
productRoutes.delete('/id/:id', userController.delete);
productRoutes.post('/', userController.create);

export default productRoutes;
