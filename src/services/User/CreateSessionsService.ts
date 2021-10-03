import { compare } from 'bcryptjs';
import authConfig from '../../config/auth';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import UserRepository from '../../repositories/Users/UserRepository';
import AppError from '../../errors/AppError';
import User from '../../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign(
      { name: user.name, id: user.id },
      authConfig.jwt.secret as string,
      {
        subject: user.role,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
