import { inject, injectable } from 'tsyringe';

import { IOrdersRepository } from '../../repositories/Order/IOrdersRepository';
import IUserRepository from '../../repositories/Users/IUserRepository';
import IProductRepository from '../../repositories/Product/IProductRepository';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Order from '../../models/Order';
import makeid from '../../utils/sting';

interface IRequestCreateOrder {
  customer_id: string;
  user_id: string;
  products: Product[];
}

interface IItems {
  id: string;
  total_product: number;
  product_id: string;
  amount: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    customer_id,
    user_id,
    products,
  }: IRequestCreateOrder): Promise<Order> {
    const customerExists = await this.userRepository.findById(customer_id);
    const userExists = await this.userRepository.findById(user_id);

    if (customer_id) {
      if (!customerExists) {
        throw new AppError(
          'Could not find any customer with the given id.',
          400,
        );
      }
    } else {
      if (!userExists) {
        throw new AppError(
          'Could not find any salesman with the given id.',
          400,
        );
      }
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError(
        'Could not find any products with the given ids.',
        400,
      );
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        400,
      );
    }

    // let items = [] as IItems[];

    // for (let item of products) {
    //   const itemExist = items.find(itemFind => itemFind.id === item.id);

    //   if (itemExist) {
    //     items.forEach(element => {
    //       if (element.id === item.id) {
    //         element.total_product += 1;
    //       }
    //     });
    //   }

    //   const amount = existsProducts.filter(p => p.id === item.id)[0].amount;

    //   if (!itemExist)
    //     items.push({
    //       ...item,
    //       total_product: 1,
    //       product_id: item.id,
    //       amount,
    //     });
    // }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      amount: existsProducts.filter(p => p.id === product.id)[0].amount,
    }));

    const order = await this.ordersRepository.create({
      code: makeid(5),
      user: userExists,
      customer: customerExists,
      products: serializedProducts,
    });

    return order;
  }
}

export default CreateOrderService;
