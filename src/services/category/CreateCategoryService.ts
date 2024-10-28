import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if (!name || name.trim() === '') {
            throw new Error('Nome inválido');
        }

        // Normaliza o nome da categoria para minúsculas
        const normalizedName = name.trim().toLowerCase();

        // Verifica se a categoria já existe com o nome em minúsculas
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                name: {
                    equals: normalizedName,
                    mode: "insensitive"  // Ignora a capitalização ao comparar
                }
            }
        });

        if (categoryExists) {
            throw new Error('Categoria já existe');
        }

        // Cria a categoria com o nome normalizado
        const category = await prismaClient.category.create({
            data: { name: normalizedName },
            select: { id: true, name: true }
        });

        return category;
    }
}

export { CreateCategoryService };
