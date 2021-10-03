import { IOrdersRepository } from './IOrdersRepository';
import { getRepository, Like, Repository } from 'typeorm';
import CreateOrderDTO from '../../dtos/CreateOrderDTO';
import IPaginate from '../../interfaces/IPaginate';
import Order from '../../models/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async find(): Promise<Order[]> {
    return this.ormRepository.find({
      relations: ['order_products', 'customer', 'user'],
      order: {
        created_at: 'ASC',
      },
    });
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer', 'user'],
    });

    return order;
  }

  public async findAllPaginate(): Promise<IPaginate<Order>> {
    const orders = await this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('orders.customer', 'customer')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .paginate();

    return orders as IPaginate<Order>;
  }

  public async create({
    code,
    customer,
    products,
    user,
  }: CreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      code,
      customer,
      user,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }

  public async delete(order: Order): Promise<void> {
    await this.ormRepository.remove(order);
  }
}

export default OrdersRepository;
