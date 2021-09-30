import UserRepository from '../../repositories/Users/UserRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 400);
    }

    await this.userRepository.delete(user);
  }
}

export default DeleteCustomerService;
