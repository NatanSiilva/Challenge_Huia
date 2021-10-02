import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    if (products.length === 0) {
      throw new AppError('Not products found', 400);
    }

    return products;
  }
}

export default ListProductService;
