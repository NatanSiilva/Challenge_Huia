import IUserRepository from '../repositories/Users/IUserRepository';
import UserRepository from '../repositories/Users/UserRepository';
import { container } from 'tsyringe';
import IProductRepository from '../repositories/Product/IProductRepository';
import ProductRepository from '../repositories/Product/ProductRepository';
import LotRepository from '../repositories/Lot/LotRepository';
import ILotRepository from '../repositories/Lot/ILotRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<ILotRepository>('LotRepository', LotRepository);
