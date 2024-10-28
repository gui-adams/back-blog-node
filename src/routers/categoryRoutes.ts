import { Router } from 'express';
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { ListCategoryController } from "../controllers/category/ListCategoryController";
import { EditCategoryController } from "../controllers/category/EditCategoryController";
import { DeleteCategoryController } from "../controllers/category/DeleteCategoryController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoryRoutes = Router();

categoryRoutes.post("/category", isAuthenticated, ensureAdmin, new CreateCategoryController().handle);
categoryRoutes.get("/category", isAuthenticated, new ListCategoryController().handle);
categoryRoutes.put("/category/:id", isAuthenticated, ensureAdmin, new EditCategoryController().handle);
categoryRoutes.delete("/category/:id", isAuthenticated, ensureAdmin, new DeleteCategoryController().handle);

export { categoryRoutes };
