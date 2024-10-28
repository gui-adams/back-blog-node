import { Router } from 'express';
import { CreateCategoryControllers } from "../controllers/category/CreateCategoryControllers";
import { ListCategoryController } from "../controllers/category/ListCategoryController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const categoryRoutes = Router();

// Criação de categoria (apenas para usuários autenticados)
categoryRoutes.post("/category", isAuthenticated, new CreateCategoryControllers().handle);

// Listagem de categorias (apenas para usuários autenticados)
categoryRoutes.get("/category", isAuthenticated, new ListCategoryController().handle);

export { categoryRoutes };
