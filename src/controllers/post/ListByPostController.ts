import { Request, Response } from 'express';
import { ListByPostService } from '../../services/post/ListByPostService';

class ListByPostController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string | undefined;
        const listByPosts = new ListByPostService();

        try {
            const posts = await listByPosts.execute({ category_id });
            return res.json(posts);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ListByPostController };
