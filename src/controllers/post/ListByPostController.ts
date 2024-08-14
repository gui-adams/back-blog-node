import { Request, Response } from 'express';
import { ListByPostService } from '../../services/post/ListByPostService';

class ListByPostController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string | undefined; // 'category_id' pode ser undefined

        const listByPosts = new ListByPostService();

        const posts = await listByPosts.execute({
            category_id
        });

        return res.json(posts);
    }
}

export { ListByPostController };
