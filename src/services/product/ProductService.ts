import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  categoryId: string;
}

class ProductService {

  async listByCategory(categoryId: string) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        categoryId: categoryId
      }
    });
    return findByCategory;
  }

  async findAll() {
    const products = await prismaClient.product.findMany({
      select: {
        name: true,
        description: true,
        price: true
      }
    });
    return products;
  }

  async save({name, price, description, banner, categoryId}: ProductRequest) {
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        categoryId
      }
    });
    return product;
  }
}

export {ProductService};
