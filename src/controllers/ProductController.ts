import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../services/Product/CreateProductService';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { code, name, lot_number, color, description, amount } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      code,
      name,
      lot_number,
      color,
      description,
      amount,
    });

    return res.json({ success: true, data: product });
  }
}

export default ProductController;
