import Product from '../../models/Products';
import CreateProductDTO from '../../dtos/CreateProductDTO';
import IPaginate from '../../interfaces/IPaginate';

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  findAllPaginate(): Promise<IPaginate<Product>>;
  findByEmail(email: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  create(createProductDTO: CreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}
