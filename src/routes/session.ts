import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRoutes = Router();
const sessionController = new SessionsController();

sessionRoutes.post('/', sessionController.create);

export default sessionRoutes;
