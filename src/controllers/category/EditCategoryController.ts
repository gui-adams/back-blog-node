import { Request, Response } from 'express';
import { EditCategoryService } from '../../services/category/EditCategoryService';

class EditCategoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const editCategoryService = new EditCategoryService();

        try {
            const category = await editCategoryService.execute({ id, name });
            return res.json(category);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditCategoryController };
