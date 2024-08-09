import {Request, Response} from 'express'
import { ListCategoryService } from '../../services/category/listCategoryService'


class ListCategoryController{
    async handle (req: Request, rest: Response){
        const listeCategoryService = new ListCategoryService();

        const category = await listeCategoryService.execute();

        return rest.json(category);
    }
}

export {ListCategoryController}