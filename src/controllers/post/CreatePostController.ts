import { Request, Response } from 'express';
import { CreatePostService } from '../../services/post/CreatePostService';

class CreatePostController {
    async handle(req: Request, res: Response) {
        const { title, description, conteudo, draft, published, category_id } = req.body;
        const author_id = req.user_id;

        if (!title || !conteudo || !category_id || !author_id) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Falha no upload do arquivo" });
        }

        const { filename: banner } = req.file;
        const createPostService = new CreatePostService();

        try {
            const post = await createPostService.execute({
                title,
                description,
                conteudo,
                banner,
                draft: draft === 'true',
                published: published === 'true',
                category_id,
                author_id,
            });
            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreatePostController };
