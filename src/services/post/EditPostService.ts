import prismaClient from "../../prisma";

interface EditPostRequest {
    id: string;
    title?: string;
    description?: string;
    conteudo?: string;
    banner?: string;
    draft?: boolean;
    published?: boolean;
    category_id?: string; // Inclui category_id
}


class EditPostService {
    async execute({ id, title, description, conteudo, banner, draft, published, category_id }: EditPostRequest) {
        const existingPost = await prismaClient.post.findUnique({ where: { id } });
        if (!existingPost) {
            throw new Error("Post não encontrado");
        }

        const updatedPost = await prismaClient.post.update({
            where: { id },
            data: {
                title,
                description,
                conteudo,
                banner,
                draft,
                published,
                category_id, // Inclui category_id na atualização
            },
        });

        return updatedPost;
    }
}

export { EditPostService };