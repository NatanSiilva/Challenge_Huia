import { Router } from 'express';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: '🚀  Server is running' }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);

export default routes;
