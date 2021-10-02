import { inject, injectable } from 'tsyringe';

import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';
import AppError from '../../errors/AppError';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    return product;
  }
}

export default ShowProductService;
