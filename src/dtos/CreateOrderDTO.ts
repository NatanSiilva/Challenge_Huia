import { IUser } from './CreateUserDTO';

export interface ICreateOrderProducts {
  product_id: string;
  // total_product: number;
  amount: number;
}

export default interface CreateOrderDTO {
  code: string;
  customer: IUser | undefined;
  user: IUser | undefined;
  products: ICreateOrderProducts[];
}
