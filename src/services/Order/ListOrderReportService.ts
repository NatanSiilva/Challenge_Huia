import IPaginate from '../../interfaces/IPaginate';
import Order from '../../models/Order';
import { IOrdersRepository } from '../../repositories/Order/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

interface IResponse {
  order_quantity: number;
}

@injectable()
class ListOrderReportService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<IResponse[]> {
    const orders = await this.ordersRepository.find();

    console.log('REPOST:', orders);

    const report = {
        order_quantity: orders.length,
    };

    return report;
  }
}

export default ListOrderReportService;
