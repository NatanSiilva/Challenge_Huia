import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLotService from '../services/Lot/CreateLotService';
import ListLotService from '../services/Lot/ListLotService';
import DeleteLotService from '../services/Lot/DeleteLotService';

class LotController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listLots = container.resolve(ListLotService);

    const lots = await listLots.execute();

    return res.json({ total: lots.length, success: true, data: lots });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { code, manufacturing_date, product_quantity } = req.body;

    const createLot = container.resolve(CreateLotService);

    const lot = await createLot.execute({
      code,
      manufacturing_date,
      product_quantity,
    });

    return res.json({ success: true, data: lot });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteLot = container.resolve(DeleteLotService);

    await deleteLot.execute(id);

    return res.json({ success: true, message: 'Lot deleted success' });
  }
}

export default LotController;
