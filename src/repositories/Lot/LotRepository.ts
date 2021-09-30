import { Repository, getRepository } from 'typeorm';
import ILotRepository from './ILotRepository';
import Lot from '../../models/lots';
import createLotDTO from '../../dtos/CreateLotDTO';

class LotRepository implements ILotRepository {
  private ormRepository: Repository<Lot>;

  constructor() {
    this.ormRepository = getRepository(Lot);
  }

  public async findAll(): Promise<Lot[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Lot | undefined> {
    const lot = await this.ormRepository.findOne({
      where: { id },
    });

    return lot;
  }

  public async findByEmail(email: string): Promise<Lot | undefined> {
    const lot = await this.ormRepository.findOne({
      where: { email },
    });

    return lot;
  }

  public async findByCode(code: number): Promise<Lot | undefined> {
    const lot = await this.ormRepository.findOne({
      where: { code },
    });

    return lot;
  }

  public async create({
    manufacturing_date,
    product_quantity,
    code,
  }: createLotDTO): Promise<Lot> {
    const lot = this.ormRepository.create({
      manufacturing_date,
      product_quantity,
      code,
    });

    await this.ormRepository.save(lot);

    return lot;
  }

  public async save(lot: Lot): Promise<Lot> {
    return this.ormRepository.save(lot);
  }

  public async delete(lot: Lot): Promise<void> {
    await this.ormRepository.remove(lot);
  }
}

export default LotRepository;
