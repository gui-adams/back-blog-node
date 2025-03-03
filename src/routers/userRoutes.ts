import { Router } from 'express';
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailUserController";
import { EditUserController } from "../controllers/user/EditUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateRequest } from "../middlewares/validateRequest";
import { userEditSchema } from "../validators/userValidator";

const userRoutes = Router();

// Criação de usuário (apenas para administradores)
userRoutes.post("/users",   new CreateUserController().handle);

// Login de usuários
userRoutes.post("/session", new AuthUserController().handle);

// Detalhes do usuário logado
userRoutes.get("/me", isAuthenticated, new DetailUserController().handle);

// Edição de usuários (apenas para administradores)
userRoutes.put("/users/:id", isAuthenticated, ensureAdmin, validateRequest(userEditSchema), new EditUserController().handle);

// Exclusão de usuários (apenas para administradores)
userRoutes.delete("/users/:id", isAuthenticated, ensureAdmin, new DeleteUserController().handle);

export { userRoutes };
