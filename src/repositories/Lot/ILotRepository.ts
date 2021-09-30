import createLotDTO from '../../dtos/CreateLotDTO';
import Lot from '../../models/lots';

export default interface ILotRepository {
  findAll(): Promise<Lot[]>;
  findByEmail(email: string): Promise<Lot | undefined>;
  findByCode(code: number): Promise<Lot | undefined>;
  findById(id: string): Promise<Lot | undefined>;
  create(createLotDTO: createLotDTO): Promise<Lot>;
  save(lot: Lot): Promise<Lot>;
  delete(lot: Lot): Promise<void>;
}
