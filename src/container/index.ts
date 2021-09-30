import IUserRepository from '../repositories/Users/IUserRepository';
import UserRepository from '../repositories/Users/UserRepository';
import { container } from 'tsyringe';
import IProductRepository from '@repositories/Product/IProductRepository';
import ProductRepository from '@repositories/Product/ProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
