import { Router } from 'express';
import multer from 'multer';
import { CreatePostController } from "../controllers/post/CreatePostController";
import { ListByPostController } from "../controllers/post/ListByPostController";
import { EditPostController } from "../controllers/post/EditPostController";
import { DeletePostController } from "../controllers/post/DeletePostController";
import { GetPostByIdController } from "../controllers/post/GetPostByIdController"; // Importação do novo controller
import { isAuthenticated } from "../middlewares/isAuthenticated";
import uploadConfig from "../config/multer";

const postRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// Criação de post com upload de arquivo
postRoutes.post("/post", isAuthenticated, upload.single("file"), new CreatePostController().handle);

// Listagem de posts por categoria
postRoutes.get("/category/posts", new ListByPostController().handle);

// Buscar post específico por ID
postRoutes.get("/post/:id", isAuthenticated, new GetPostByIdController().handle); // Nova rota

// Edição de post
postRoutes.put("/post/:id", isAuthenticated, new EditPostController().handle);

// Exclusão de post
postRoutes.delete("/post/:id", isAuthenticated, new DeletePostController().handle);

export { postRoutes };
