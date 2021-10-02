import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const userController = new ProductController();

// userRoutes.use(authentication)
productRoutes.get('/', userController.index);
productRoutes.get('/id/:lot_id', userController.indexLotProduct);
productRoutes.post('/', userController.create);

export default productRoutes;
