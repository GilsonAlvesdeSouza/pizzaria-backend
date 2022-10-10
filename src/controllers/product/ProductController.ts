import { Request, Response } from "express";
import { ProductService } from "../../services/product/ProductService";
import validator from "validator";

const productService = new ProductService();

class ProductController {
  async store(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;

    if (validator.isEmpty(name)) {
      throw new Error("name is require");
    }

    if (validator.isEmpty(price)) {
      throw new Error("price is require");
    }

    if (validator.isEmpty(description)) {
      throw new Error("description is require");
    }

    if (validator.isEmpty(categoryId)) {
      throw new Error("categoryId is require");
    }

    if (!req.file) {
      throw new Error("error upload file");
    }

    const { filename: banner } = req.file;
    console.log(banner);

    const product = await productService.save({
      name,
      price,
      description,
      banner,
      categoryId,
    });
    return res.status(201).json(product);
  }
}

export { ProductController };
