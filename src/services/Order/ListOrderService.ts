import IPaginate from '../../interfaces/IPaginate';
import Order from '../../models/Order';
import { IOrdersRepository } from '../../repositories/Order/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<IPaginate<Order>> {
    const orders = await this.ordersRepository.findAllPaginate();

    return orders;
  }
}

export default ListOrderService;
