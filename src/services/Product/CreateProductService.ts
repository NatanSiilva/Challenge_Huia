import { hash } from 'bcryptjs';

import User from '../../models/User';
import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '@repositories/Product/ProductRepository';
import Product from '@models/Products';

interface Request {
  name: string;
  lot_number: string;
  color: string;
  description: string;
  amount: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute({
    amount,
    color,
    description,
    lot_number,
    name,
  }: Request): Promise<Product> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('product already exists with that name', 400);
    }

    const product = await this.productRepository.create({
      amount,
      color,
      description,
      lot_number,
      name,
    });

    return product;
  }
}

export default CreateProductService;
