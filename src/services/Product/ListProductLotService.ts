import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';

@injectable()
class ListProductLotService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute(lot_id: string): Promise<Product[]> {
    const products = await this.productRepository.findByLotId(lot_id);

    if (products.length === 0) {
      throw new AppError('Not products found', 400);
    }

    return products;
  }
}

export default ListProductLotService;
