import { Request, Response } from "express";
import { CategoryServices } from "../../services/category/CategoryServices";
import validator from "validator";

const categoryServices = new CategoryServices();

class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await categoryServices.findAll();
    return res.status(200).json(categories);
  }

  async store(req: Request, res: Response) {
    const { name } = req.body;
    const lengthName = validator.isLength(name, { min: 3, max: undefined });
    
    if (!lengthName) {
      throw new Error("the minimum size is 3");
    }

    const category = await categoryServices.save(name);
    return res.status(201).json(category);
  }
}

export { CategoryController };
