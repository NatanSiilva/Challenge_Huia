import ListOrderService from '../services/Order/ListOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../services/Order/CreateOrderService';
import ShowOrderService from '../services/Order/ShowOrderService';
import ListOrderReportService from '../services/Order/ListOrderReportService';
import DeleteOrderService from '../services/Order/DeleteOrderService';

export default class OrdersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();

    return res.json({ success: true, data: orders });
  }

  public async indexReport(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderReportService);

    const orders = await listOrders.execute();

    return res.json({ success: true, data: orders });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute(id);

    return res.json({ success: true, data: order });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products, user_id } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      user_id,
      customer_id,
      products,
    });

    return res.json({ success: true, data: order });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute(id);

    return res.json({ message: 'Order deleted success' });
  }
}
