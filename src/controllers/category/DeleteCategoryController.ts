import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const deleteCategoryService = new DeleteCategoryService();

        try {
            const result = await deleteCategoryService.execute({ id });
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteCategoryController };
