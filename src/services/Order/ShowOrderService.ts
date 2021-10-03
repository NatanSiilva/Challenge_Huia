import AppError from '../../errors/AppError';
import Order from '../../models/Order';
import { IOrdersRepository } from '../../repositories/Order/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 400);
    }

    return order;
  }
}

export default ShowOrderService;
