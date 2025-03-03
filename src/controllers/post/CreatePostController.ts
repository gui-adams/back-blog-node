import { Request, Response } from 'express';
import { CreatePostService } from '../../services/post/CreatePostService';

class CreatePostController {
    async handle(req: Request, res: Response) {
        const { title, description = '', content, published, categories: category_id, slug } = req.body;

        if (!title || !content || !category_id) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Arquivo de imagem é obrigatório" });
        }

        const image = req.file.filename;
        const createPostService = new CreatePostService();
        let auxData = {
            title,
            description,
            content,
            image,
            published: published === 'true',
            category_id,
            slug
        }
        try {
            const post = await createPostService.execute(auxData);
            if (post) {
                // Função auxiliar para converter BigInt para String
                const convertBigIntToString = (obj: any) => {
                    return Object.keys(obj).reduce((acc, key) => {
                        const value = obj[key];
                        if (typeof value === 'bigint') {
                            acc[key] = value.toString();
                        } else if (Array.isArray(value)) {
                            acc[key] = value.map(item =>
                                typeof item === 'object' ? convertBigIntToString(item) : item
                            );
                        } else if (value && typeof value === 'object') {
                            acc[key] = convertBigIntToString(value);
                        } else {
                            acc[key] = value;
                        }
                        return acc;
                    }, {} as any);
                };

                // Converter todos os BigInts para String no objeto post
                const serializedPost = convertBigIntToString(post);
                return res.status(201).json(serializedPost);
            } else {
                return res.status(502).json({ error: 'Erro ao criar post.' });
            }
        } catch (error) {
            console.log('Error:', error);
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreatePostController };
