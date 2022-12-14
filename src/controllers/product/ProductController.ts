import {Request, Response} from "express";
import {ProductService} from "../../services/product/ProductService";
import validator from "validator";

const productService = new ProductService();

class ProductController {

  async index(req: Request, res: Response) {
    const products = await productService.findAll();
    return res.status(200).json(products);
  }

  async store(req: Request, res: Response) {
    const {name, price, description, categoryId} = req.body;

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
    } else {

      const {filename: banner} = req.file;

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

  async listByCategory(req: Request, res: Response) {
    const categoryId = req.query.categoryId as string;
    const produtcs = await productService.listByCategory(categoryId);
    return res.json(produtcs);
  }
}


export {ProductController};
