import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProductService from '../services/Product/ListProductService';
import CreateProductService from '../services/Product/CreateProductService';
import ListProductLotService from '../services/Product/ListProductLotService';
import DeleteProductService from '../services/Product/DeleteProductService';
import UpdateProductService from '../services/Product/UpdateProductService';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProduct = container.resolve(ListProductService);

    const product = await listProduct.execute();

    return res.json({ total: product.length, success: true, data: product });
  }

  public async indexLotProduct(req: Request, res: Response): Promise<Response> {
    const { lot_id } = req.params;

    const listProduct = container.resolve(ListProductLotService);

    const products = await listProduct.execute(lot_id);

    return res.json({ total: products.length, success: true, data: products });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, lot_id, color, description, amount } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      lot_id,
      color,
      description,
      amount,
    });

    return res.json({ success: true, data: product });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, color, description, amount } = request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      color,
      description,
      amount,
    });

    return response.json({ success: true, data: product });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(id);

    return res.json({ message: 'Product deleted success' });
  }
}

export default ProductController;
