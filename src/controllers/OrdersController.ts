import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../services/Order/CreateOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products, user_id } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      user_id,
      customer_id,
      products,
    });

    return response.json({ success: true, data: order });
  }
}
