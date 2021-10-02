import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const userController = new ProductController();

// userRoutes.use(authentication)
productRoutes.get('/', userController.index);
productRoutes.get('/id/:lot_id', userController.indexLotProduct);
productRoutes.get('/id/:id/prod', userController.show);
productRoutes.put('/id/:id', userController.update);
productRoutes.post('/', userController.create);
productRoutes.delete('/id/:id', userController.delete);

export default productRoutes;
