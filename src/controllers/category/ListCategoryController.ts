import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const listCategoryService = new ListCategoryService();

        try {
            const categories = await listCategoryService.execute();
            if (categories.length === 0) {
                // Retorna uma lista vazia para manter o formato consistente
                return res.status(200).json([]);
            }
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao carregar as categorias" });
        }
    }
}


export { ListCategoryController };
