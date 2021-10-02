import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductRepository from '../../repositories/Product/ProductRepository';
import Product from '../../models/Products';
import LotRepository from '../../repositories/Lot/LotRepository';
import makeid from '../../utils/sting';

interface Request {
  name: string;
  lot_id: string;
  color: string;
  description: string;
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
    lot_id,
    name,
    amount,
  }: Request): Promise<Product> {
    const lotExists = await this.lotRepository.findById(lot_id);

    if (!lotExists) {
      throw new AppError('Batch does not exist', 400);
    }

    const products = await this.productRepository.findAll();

    const lotProductExites = products.filter(
      product => product.lot_id === lot_id,
    );

    if (lotProductExites.length == lotExists.product_quantity) {
      throw new AppError('Product cannot be created, batch exceeded', 400);
    }

    const product = await this.productRepository.create({
      amount,
      color,
      description,
      lot_id,
      name,
      code: makeid(5),
    });

    return product;
  }
}

export default CreateProductService;
