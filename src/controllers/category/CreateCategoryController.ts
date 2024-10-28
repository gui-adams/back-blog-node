import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const createCategoryService = new CreateCategoryService();

        try {
            const category = await createCategoryService.execute({ name });
            return res.status(201).json(category);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateCategoryController };
