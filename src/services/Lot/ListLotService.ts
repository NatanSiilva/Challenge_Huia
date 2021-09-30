import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILotRepository from '../../repositories/Lot/ILotRepository';
import Lot from '../../models/lots';

@injectable()
class ListLotService {
  constructor(@inject('LotRepository') private lotRepository: ILotRepository) {}

  public async execute(): Promise<Lot[]> {
    const lots = await this.lotRepository.findAll();

    if (lots.length === 0) {
      throw new AppError('Not a lot was found', 400);
    }

    return lots;
  }
}

export default ListLotService;
