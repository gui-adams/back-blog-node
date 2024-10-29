import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const deleteCategoryService = new DeleteCategoryService();

        try {
            await deleteCategoryService.execute({ id });
            return res.status(204).send(); // 204 No Content para exclusão bem-sucedida sem corpo
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteCategoryController };
