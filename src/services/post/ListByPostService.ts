import prismaClient from "../../prisma";

interface ProductRequest {
  category_id?: string; // 'category_id' é opcional
}

class ListByPostService {
  async execute({ category_id }: ProductRequest) {
    const findByCategory = await prismaClient.post.findMany({
      where: category_id ? { category_id } : {},
      include: {
        category: true, // Inclui as informações da categoria relacionada
      },
    });

    return findByCategory;
  }
}

export { ListByPostService };
