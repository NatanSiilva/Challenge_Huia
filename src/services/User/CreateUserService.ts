import { hash } from 'bcryptjs';
import UserRepository from '../../repositories/Users/UserRepository';
import User from '../../models/User';
import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  role: string;
  email: string;
  password: string;
  birth_date: string;
  cpf: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  public async execute({
    name,
    role,
    password,
    email,
    birth_date,
    cpf,
  }: Request): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already a user with this email', 400);
    }

    const user = await this.userRepository.create({
      name,
      email,
      role,
      password: passwordHash,
      birth_date,
      cpf,
    });

    return user;
  }
}

export default CreateUserService;
