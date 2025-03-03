import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const listCategoryService = new ListCategoryService();

        try {
            const categories = await listCategoryService.execute();
            
            const serializedCategories = categories.map(category => ({
                ...category,
                id: String(category.id)
            }));

            if (serializedCategories.length === 0) {
                return res.status(200).json({ message: "Nenhuma categoria encontrada." });
            }
            return res.json(serializedCategories);
        } catch (error) {
            console.log('Error: ', error)
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ListCategoryController };
