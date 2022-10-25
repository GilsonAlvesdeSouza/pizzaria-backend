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
        id: true,
        name: true,
        draft: true,
        status: true,
        table: true,
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

  async removeOrderItem(id: string) {
    const orderItemRemove = await prismaClient.orderIem.delete({
      where: {
        id,
      },
      select: {
        id: true,
        orderId: true,
        productId: true,
        amount: true,
      },
    });

    return orderItemRemove;
  }

  async sendOrder(id: string) {
    const sendOrder = await prismaClient.order.update({
      where: {
        id,
      },
      data: {
        draft: false,
      },
    });
    return sendOrder;
  }

  async listOrdersOutOfDraft() {
    const list = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_At: "desc",
      },
    });
    return list;
  }

  async detailOrder(id: string) {
    const orderDetail = await prismaClient.orderIem.findMany({
      where: {
        orderId: id,
      },
      include: {
        Product: true,
        Order: true,
      },
    });
    return orderDetail;
  }
}
export { OrderService };
