import { Request, Response } from "express";
import prismaClient from "../../prisma";
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

  async storeItem(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const orderIemAdd = await orderService.addOrderItem({
      orderId: order_id,
      productId: product_id,
      amount: parseInt(amount),
    });

    return res.status(200).json(orderIemAdd);
  }

  async deleteItem(req: Request, res: Response) {
    const id = req.query.item_id as string;

    const deleteItem = await orderService.removeOrderItem(id);

    return res.status(200).json(deleteItem);
  }

  async sendOrder(req: Request, res: Response) {
    let { order_id } = req.body;

    const sendOrder = await orderService.sendOrder(order_id);

    return res.status(200).json(sendOrder);
  }

  async listOrdersOutOfDraft(req: Request, res: Response) {
    const list = await orderService.listOrdersOutOfDraft();

    return res.status(200).json(list);
  }

  async detailOrder(req: Request, res: Response) {
    let id = req.query.order_id as string;

    const ordersDetail = await orderService.detailOrder(id);

    return res.status(200).json(ordersDetail);
  }

  async finishOrder(req: Request, res: Response) {
    let { order_id } = req.body;

    const finishOrder = await orderService.finishOrder(order_id);

    return res.status(200).json(finishOrder);
  }
}

export { OrderController };
