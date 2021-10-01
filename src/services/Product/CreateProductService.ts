import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';
import LotRepository from '../../repositories/Lot/LotRepository';

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

    @inject('LotRepository')
    private lotRepository: LotRepository,
  ) {}

  public async execute({
    color,
    description,
    lot_number,
    name,
    code,
    amount,
  }: Request): Promise<Product> {
    const lotExists = await this.lotRepository.findByCode(lot_number);

    if (!lotExists) {
      throw new AppError('Batch does not exist', 400);
    }

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
