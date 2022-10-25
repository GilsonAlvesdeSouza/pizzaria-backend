import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
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
}
export { OrderService };
