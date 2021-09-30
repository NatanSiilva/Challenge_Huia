import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import LotRepository from '../../repositories/Lot/LotRepository';

@injectable()
class DeleteLotService {
  constructor(
    @inject('LotRepository')
    private lotRepository: LotRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const lot = await this.lotRepository.findById(id);

    if (!lot) {
      throw new AppError('Lot not found', 400);
    }

    await this.lotRepository.delete(lot);
  }
}

export default DeleteLotService;
