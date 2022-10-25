import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
}

interface ItemRequest {
  orderId: string;
  productId: string;
  amount: number;
}

class OrderService {
  async save({ table, name }: OrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
      select: {
        table: true,
        name: true,
      },
    });
    return order;
  }

  async remove(orderId: string) {
    const orderRemove = await prismaClient.order.delete({
      where: {
        id: orderId,
      },
    });
    return orderRemove;
  }

  async addOrderItem({ orderId, productId, amount }: ItemRequest) {
    const orderItemAdd = await prismaClient.orderIem.create({
      data: {
        orderId,
        productId,
        amount,
      },
      select: {
        id: true,
        Order: {
          select: {
            id: true,
            table: true,
            status: true,
            draft: true,
            name: true,
          },
        },
        orderId: true,
        productId: true,
        Product: {
          select: {
            id: true,
            categoryId: true,
            name: true,
            price: true,
            description: true,
            banner: true,
          },
        },
        amount: true,
      },
    });
    return orderItemAdd;
  }
}
export { OrderService };
