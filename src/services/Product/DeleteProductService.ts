import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import ProductRepository from '../../repositories/Product/ProductRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    await this.productRepository.delete(product);
  }
}

export default DeleteProductService;
