import prismaClient from "../../prisma";

interface ProductRequest {
  category_id?: string;
}

class ListByPostService {
  async execute({ category_id }: ProductRequest) {
    const posts = await prismaClient.post.findMany({
      where: category_id ? { category_id } : {},
      include: {
        category: true,
      },
    });

    return posts;
  }
}

export { ListByPostService };
