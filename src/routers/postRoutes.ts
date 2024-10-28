import { Router } from 'express';
import multer from 'multer';
import { CreatePostController } from "../controllers/post/CreatePostController";
import { ListByPostController } from "../controllers/post/ListByPostController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import uploadConfig from "../config/multer";

const postRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// Criação de post com upload de arquivos (apenas para usuários autenticados)
postRoutes.post("/post", isAuthenticated, upload.single("file"), new CreatePostController().handle);

// Listagem de posts por categoria
postRoutes.get("/category/posts", new ListByPostController().handle);

export { postRoutes };
