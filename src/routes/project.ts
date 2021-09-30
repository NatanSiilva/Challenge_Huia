import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import ProjectController from '../controllers/ProjectController';
import authentication from '../middleware/auth';

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.use(authentication);

projectRoutes.get('/', projectController.index);
projectRoutes.get('/user/:user_id', projectController.indexOfUser);
projectRoutes.get('/:id', projectController.show);
projectRoutes.post(
  '/',
  multer(multerConfig).single('logo'),
  projectController.create,
);
projectRoutes.put(
  '/:id/upload',
  multer(multerConfig).single('logo'),
  projectController.UploadLogo,
);
projectRoutes.put('/:id', projectController.update);
projectRoutes.patch('/:id', projectController.changeStatus);

export default projectRoutes;
