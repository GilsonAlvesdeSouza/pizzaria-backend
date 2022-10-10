import prismaClient from "../../prisma";

class CategoryServices {
  async findAll() {
    const categories = prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }

  async save(name: string) {
    const category = prismaClient.category.create({
      data: {
        name,
      },
      select: { id: true, name: true },
    });
    return category;
  }
}

export { CategoryServices };
