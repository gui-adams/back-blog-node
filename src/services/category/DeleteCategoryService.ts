import prismaClient from "../../prisma";

interface DeleteCategoryRequest {
    id: string;
}

class DeleteCategoryService {
    async execute({ id }: DeleteCategoryRequest) {
        const category = await prismaClient.category.findUnique({ where: { id } });
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        await prismaClient.category.delete({ where: { id } });
        return { message: 'Categoria excluída com sucesso' };
    }
}

export { DeleteCategoryService };
