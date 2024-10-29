import prismaClient from "../../prisma";

interface EditPostRequest {
    id: string;
    title?: string;
    description?: string;
    conteudo?: string;
    banner?: string;
    draft?: boolean;
    published?: boolean;
}

class EditPostService {
    async execute({ id, title, description, conteudo, banner, draft, published }: EditPostRequest) {
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
            }
        });

        return updatedPost;
    }
}

export { EditPostService };
