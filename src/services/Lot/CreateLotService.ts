import AppError from '../../errors/AppError';
import { inject, injectable } from 'tsyringe';
import LotRepository from '../../repositories/Lot/LotRepository';
import Lot from '../../models/lots';

interface Request {
  manufacturing_date: string;
  product_quantity: string;
  code: string;
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
    code,
  }: Request): Promise<Lot> {
    const lotExists = await this.lotRepository.findByCode(code);

    if (lotExists) {
      throw new AppError('batch already exists', 400);
    }

    const lot = await this.lotRepository.create({
      manufacturing_date,
      product_quantity,
      code,
    });

    return lot;
  }
}

export default CreateLotService;
