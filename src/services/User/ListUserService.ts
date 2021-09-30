import AppError from '../../errors/AppError';
import User from '../../models/User';
import IUserRepository from '../../repositories/Users/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllProjectService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    if (users.length === 0) {
      throw new AppError('Not users found', 400);
    }

    return users;
  }
}

export default ListAllProjectService;
