import { Router } from 'express';
import lotRoutes from './lot';
import productRoutes from './product';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: '🚀  Server is running' }),
);

routes.use(`${prefixRoutes}/product`, productRoutes);
routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/lot`, lotRoutes);

export default routes;
