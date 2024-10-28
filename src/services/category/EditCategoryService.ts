import prismaClient from "../../prisma";

interface EditCategoryRequest {
    id: string;
    name: string;
}

class EditCategoryService {
    async execute({ id, name }: EditCategoryRequest) {
        if (!name || name.trim() === '') {
            throw new Error('Nome inválido');
        }

        // Verifica se a categoria já existe
        const categoryExists = await prismaClient.category.findUnique({
            where: { name }
        });

        if (categoryExists) {
            throw new Error('Categoria já existe com esse nome');
        }

        const updatedCategory = await prismaClient.category.update({
            where: { id },
            data: { name },
            select: { id: true, name: true }
        });

        return updatedCategory;
    }
}

export { EditCategoryService };
