import { Request, Response } from 'express';
import { DeletePostService } from '../../services/post/DeletePostService';

class DeletePostController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deletePostService = new DeletePostService();

        try {
            const result = await deletePostService.execute(id);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeletePostController };
