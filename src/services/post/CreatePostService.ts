import prismaClient from "../../prisma";

interface PostRequest {
    title: string;
    description?: string;
    content: string;
    slug: string;
    image: string;
    published?: boolean;
    category_id: any;
}

class CreatePostService {
    async execute({ title, description, content, image, published = false, category_id, slug }: PostRequest) {
        
        if (!title || !content || !category_id) {
            throw new Error("Campos obrigatórios faltando");
        }

        // Verificar se o slug já existe e adicionar sufixo se necessário
        let finalSlug = slug;
        let counter = 1;
        
        while (true) {
            const existingPost = await prismaClient.post.findUnique({
                where: { slug: finalSlug }
            });
            
            if (!existingPost) break;
            
            finalSlug = `${slug}-${counter}`;
            counter++;
        }

        try {
            
            const post = await prismaClient.post.create({
                data: {
                    title,
                    description,
                    content,
                    slug: finalSlug,
                    image,
                    published,
                    post_category: {
                        create: {
                            category_id: Number(category_id)
                        }
                    }
                },
                include: {
                    post_category: true
                }
            });

            return post;
        } catch (error) {
            console.log('Error: ', error)
        }
    }
}

export { CreatePostService };
