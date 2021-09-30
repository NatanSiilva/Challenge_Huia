import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UserRepository from '../repositories/Users/UserRepository';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const userRespository = new UserRepository();
    const createUser = new CreateUserService(userRespository);

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
    });

    return response.json(classToClass({ data: user }));
  }
}

export default UserController;
