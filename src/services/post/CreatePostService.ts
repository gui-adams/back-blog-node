import prismaClient from "../../prisma";

interface PostRequest {
    title: string;
    description?: string;
    conteudo: string;
    banner: string;
    draft?: boolean;
    published?: boolean;
    category_id: string;
    author_id: string;  // Campo obrigatório
}

class CreatePostService {
    async execute({ title, description, conteudo, banner, draft = true, published = false, category_id, author_id }: PostRequest) {
        if (!title || !conteudo || !banner || !category_id || !author_id) {
            throw new Error("Campos obrigatórios faltando");
        }

        const post = await prismaClient.post.create({
            data: {
                title,
                description,
                conteudo,
                banner,
                draft,
                published,
                category_id,
                author_id, // Inclui author_id
            },
        });

        return post;
    }
}

export { CreatePostService };
