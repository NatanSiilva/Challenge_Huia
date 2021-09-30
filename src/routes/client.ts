import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import authentication from '../middleware/auth';

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.use(authentication)

clientRoutes.get('/', clientController.index);
clientRoutes.get('/paginated', clientController.paginated);
clientRoutes.get('/search', clientController.search);
clientRoutes.post('/', clientController.create);
clientRoutes.put('/:id', clientController.update);
clientRoutes.delete('/:id', clientController.destroy);


export default clientRoutes;
