import { Request, Response } from 'express';
import { EditPostService } from '../../services/post/EditPostService';

class EditPostController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, conteudo, draft, published } = req.body;

        const editPostService = new EditPostService();

        try {
            const post = await editPostService.execute({
                id,
                title,
                description,
                conteudo,
                draft,
                published,
            });
            return res.json(post);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditPostController };
