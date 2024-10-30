// src/routes/postRoutes.ts

import { Router } from 'express';
import multer from 'multer';
import { CreatePostController } from "../controllers/post/CreatePostController";
import { ListByPostController } from "../controllers/post/ListByPostController";
import { EditPostController } from "../controllers/post/EditPostController";
import { DeletePostController } from "../controllers/post/DeletePostController";
import { GetPostByIdController } from "../controllers/post/GetPostByIdController";
import { ListPublicPostsController } from "../controllers/post/ListPublicPostsController"; // Importação do novo controller
import { GetPublicPostByIdController } from "../controllers/post/GetPublicPostByIdController"; // Novo controlador
import { isAuthenticated } from "../middlewares/isAuthenticated";
import uploadConfig from "../config/multer";

const postRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// Rota pública para listagem de posts para usuários comuns
postRoutes.get("/posts", new ListPublicPostsController().handle);

// Criação de post com upload de arquivo
postRoutes.post("/post", isAuthenticated, upload.single("file"), new CreatePostController().handle);

// Listagem de posts por categoria
postRoutes.get("/category/posts", new ListByPostController().handle);

// Rota pública para buscar um post por ID
postRoutes.get("/posts/public/:id", new GetPublicPostByIdController().handle);


// Buscar post específico por ID para edição (protegida)
postRoutes.get("/post/:id", isAuthenticated, new GetPostByIdController().handle);

// Edição de post
postRoutes.put("/post/:id", isAuthenticated, new EditPostController().handle);

// Exclusão de post
postRoutes.delete("/post/:id", isAuthenticated, new DeletePostController().handle);

export { postRoutes };
