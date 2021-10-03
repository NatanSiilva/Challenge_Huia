import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import { IOrdersRepository } from '../../repositories/Order/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 400);
    }

    await this.ordersRepository.delete(order);
  }
}

export default DeleteOrderService;
