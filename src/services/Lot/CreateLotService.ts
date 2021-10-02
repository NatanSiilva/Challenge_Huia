import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import LotRepository from '../../repositories/Lot/LotRepository';
import Lot from '../../models/lots';
import makeid from '../../utils/sting';

interface Request {
  manufacturing_date: string;
  product_quantity: number;
}

@injectable()
class CreateLotService {
  constructor(
    @inject('LotRepository')
    private lotRepository: LotRepository,
  ) {}

  public async execute({
    manufacturing_date,
    product_quantity,
  }: Request): Promise<Lot> {
    const lot = await this.lotRepository.create({
      manufacturing_date,
      product_quantity,
      code: makeid(5),
    });

    return lot;
  }
}

export default CreateLotService;
