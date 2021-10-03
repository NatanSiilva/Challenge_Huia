import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';
import AppError from '../../errors/AppError';

interface IRequest {
  id: string;
  name: string;
  color: string;
  description: string;
  amount: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute({
    id,
    name,
    amount,
    color,
    description,
  }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    product.name = name;
    product.amount = amount;
    product.color = color;
    product.description = description;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
