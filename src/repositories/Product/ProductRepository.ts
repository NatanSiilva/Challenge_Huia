import { Repository, getRepository } from 'typeorm';
import IPaginate from '../../interfaces/IPaginate';
import Product from '../../models/Products';
import IProductRepository from './IProductRepository';
import CreateProductDTO from '../../dtos/CreateProductDTO';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async findAllPaginate(): Promise<IPaginate<Product>> {
    const product = await this.ormRepository.createQueryBuilder().paginate();

    return product as IPaginate<Product>;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async findByLotId(lot_id: string): Promise<Product[]> {
    const product = await this.ormRepository.find({
      where: { lot_id },
    });

    return product;
  }

  public async findByCode(code: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { code },
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findByEmail(email: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { email },
    });

    return product;
  }

  public async create({
    amount,
    color,
    description,
    lot_id,
    name,
    code,
  }: CreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      amount,
      color,
      description,
      lot_id,
      name,
      code,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default ProductRepository;
