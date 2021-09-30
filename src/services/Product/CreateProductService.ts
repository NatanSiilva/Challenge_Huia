import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';

interface Request {
  name: string;
  lot_number: number;
  color: string;
  description: string;
  code: number;
  amount: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute({
    color,
    description,
    lot_number,
    name,
    code,
    amount,
  }: Request): Promise<Product> {
    const codeExists = await this.productRepository.findByCode(code);

    if (codeExists) {
      throw new AppError('Code already exists', 400);
    }

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
      code,
    });

    return product;
  }
}

export default CreateProductService;
