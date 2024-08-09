import { Request, Response } from 'express';
import { CreatePostService } from '../../services/post/CreatePostService';

class CreatePostController {
    async handle(req: Request, res: Response) {
        const { title, description, conteudo, banner, draft, published, category_id } = req.body;

        // Obtendo o ID do usuário autenticado
        const author_id = req.user_id;

        // Verifique se todos os campos obrigatórios estão presentes
        if (!title || !conteudo || !banner || !category_id || !author_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const createPostService = new CreatePostService();

        try {
            const post = await createPostService.execute({
                title,
                description,
                conteudo,
                banner,
                draft,
                published,
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
