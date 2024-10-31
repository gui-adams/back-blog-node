import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from "../controllers/user/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailUserController";
import { EditUserController } from "../controllers/user/EditUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { ChangePasswordController } from "../controllers/user/ChangePasswordController";
import { ListUsersController } from '../controllers/user/ListUsersController';
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";
import { userEditSchema } from "../validators/userValidator";

const userRoutes = Router();

// Adicione a rota GET para listar usuários
userRoutes.get('/list', isAuthenticated, ensureAdmin, new ListUsersController().handle);
userRoutes.post('/create', isAuthenticated, ensureAdmin, new CreateUserController().handle);
userRoutes.post("/session", new AuthUserController().handle);
userRoutes.get("/me", isAuthenticated, new DetailUserController().handle);
userRoutes.put("/users/:id", isAuthenticated, ensureAdmin, validateRequest(userEditSchema), new EditUserController().handle);
userRoutes.delete("/users/:id", isAuthenticated, ensureAdmin, new DeleteUserController().handle);
userRoutes.put("/change-password", isAuthenticated, new ChangePasswordController().handle);

export { userRoutes };
