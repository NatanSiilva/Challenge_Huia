import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const userController = new ProductController();

// userRoutes.use(authentication)
productRoutes.post('/', userController.create);

export default productRoutes;
