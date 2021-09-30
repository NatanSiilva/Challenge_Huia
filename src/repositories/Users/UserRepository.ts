import CreateUserDTO from '@dtos/CreateUserDTO';
import User from '../../models/User';
import { Repository, getRepository } from 'typeorm';
import IUserRepository from './IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    role,
    password,
    email,
  }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      role,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UserRepository;
