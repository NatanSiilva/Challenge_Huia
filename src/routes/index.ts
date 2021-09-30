import { Router } from 'express';
import lotRoutes from './lot';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: '🚀  Server is running' }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/lot`, lotRoutes);

export default routes;
