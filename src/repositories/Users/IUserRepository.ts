import CreateUserDTO, { IUser } from '../../dtos/CreateUserDTO';
import User from '../../models/User';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  create(createUserDTO: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
