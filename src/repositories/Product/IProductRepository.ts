import Product from '../../models/Products';
import CreateProductDTO from '../../dtos/CreateProductDTO';
import IPaginate from '../../interfaces/IPaginate';

export interface IFindProducts {
  id: string;
}

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  findAllPaginate(): Promise<IPaginate<Product>>;
  findByEmail(email: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  findByLotId(lot_id: string): Promise<Product[]>;
  create(createProductDTO: CreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}
