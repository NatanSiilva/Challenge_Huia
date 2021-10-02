import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from './Products';

@Entity('lots')
class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @OneToMany(() => Product, product => product.lot_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

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
