import { Request, Response } from "express";
import { OrderService } from "../../services/order/OrderService";

const orderService = new OrderService();
class OrderController {
  async store(req: Request, res: Response) {
    const { table, name } = req.body;

    const order = await orderService.save({ table, name });
    return res.status(201).json(order);
  }
}

export { OrderController };
