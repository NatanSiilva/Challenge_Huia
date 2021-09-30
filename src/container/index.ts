import IUserRepository from '../repositories/Users/IUserRepository';
import UserRepository from '../repositories/Users/UserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
