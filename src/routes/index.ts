import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';
import clientRoutes from './client';
import projectRoutes from './project';


const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: '🚀  Server is running' }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/clients`, clientRoutes);
routes.use(`${prefixRoutes}/projects`, projectRoutes);


export default routes;
