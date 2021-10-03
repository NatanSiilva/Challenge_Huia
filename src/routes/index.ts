import { Router } from 'express';
import lotRoutes from './lot';
import orderRoutes from './order';
import productRoutes from './product';
import sessionRoutes from './session';
import userRoutes from './user';

const routes = Router();

routes.use(`/product`, productRoutes);
routes.use(`/session`, sessionRoutes);
routes.use(`/order`, orderRoutes);
routes.use(`/user`, userRoutes);
routes.use(`/lot`, lotRoutes);

routes.get('/', (request, response) =>
  response.json({ message: '🚀  Server is running' }),
);

export default routes;
