import prismaClient from "../../prisma";

interface PostRequest {
    title: string;
    description?: string;
    conteudo: string;
    banner: string;
    draft?: boolean;       // Opcional com valor padrão true
    published?: boolean;   // Opcional com valor padrão false
    category_id: string;
    author_id: string;
}

class CreatePostService {
    async execute({ title, description, conteudo, banner, draft = true, published = false, category_id, author_id }: PostRequest) {
        // Verificando se os campos obrigatórios foram fornecidos
        if (!title || !conteudo || !banner || !category_id || !author_id) {
            throw new Error("Missing required fields");
        }

        // Criando o post usando o Prisma Client
        const post = await prismaClient.post.create({
            data: {
                title: title,
                description: description,
                conteudo: conteudo,
                banner: banner,
                draft: draft,
                published: published,
                category_id: category_id,
                author_id: author_id,
            }
        });

        return post;
    }
}

export { CreatePostService };
