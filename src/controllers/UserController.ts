import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/User/CreateUserService';
import { container } from 'tsyringe';
import ListUserService from '../services/User/ListUserService';
import DeleteCustomerService from '../services/User/DeleteUserService';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return res.json(
      classToClass({ total: users.length, success: true, data: users }),
    );
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role, birth_date, cpf } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
      birth_date,
      cpf,
    });

    return res.json(classToClass({ success: true, data: user }));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteCustomerService);

    await deleteUser.execute(id);

    return res.json({ message: 'User deleted success' });
  }
}

export default UserController;
