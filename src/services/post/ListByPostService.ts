import prismaClient from "../../prisma";

interface ProductRequest {
    category_id?: string; // 'category_id' é opcional
}

class ListByPostService {
    async execute({ category_id }: ProductRequest) {

        const findByCategory = await prismaClient.post.findMany({
            where: category_id ? { category_id } : {} // Verifica se 'category_id' está presente
        });

        return findByCategory;
    }
}

export { ListByPostService };
