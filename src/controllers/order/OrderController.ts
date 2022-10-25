import { Request, response, Response } from "express";
import { request } from "http";
import { OrderService } from "../../services/order/OrderService";

const orderService = new OrderService();
class OrderController {
  async store(req: Request, res: Response) {
    const { table, name } = req.body;

    const order = await orderService.save({ table, name });

    return res.status(201).json(order);
  }

  async delete(req: Request, res: Response) {
    const orderId = req.query.order_id as string;

    const orderRemove = await orderService.remove(orderId);

    return res.status(200).json(orderRemove);
  }
}

export { OrderController };
