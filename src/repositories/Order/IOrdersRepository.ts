import CreateOrderDTO from '../../dtos/CreateOrderDTO';
import Order from '../../models/Order';
import IPaginate from '../../interfaces/IPaginate';

export interface IOrdersRepository {
  find(): Promise<Order[]>;
  findById(id: string): Promise<Order | undefined>;
  findAllPaginate(): Promise<IPaginate<Order>>;
  create(data: CreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  delete(order: Order): Promise<void>;
}
