import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lots')
class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  manufacturing_date: string;

  @Column()
  product_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lot;
