import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryControllers } from './controllers/category/CreateCategoryControllers';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreatePostController } from './controllers/post/CreatePostController';
import { ListByPostController } from './controllers/post/ListByPostController';
import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS USERS --
// Somente administradores podem criar usuários
router.post('/users', ensureAdmin, new CreateUserController().handle);

// Autenticação de usuários (login)
router.post('/session', new AuthUserController().handle);

// Detalhes do usuário logado
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
// Criar categorias (apenas usuários autenticados)
router.post('/category', isAuthenticated, new CreateCategoryControllers().handle);

// Listar categorias (apenas usuários autenticados)
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- ROTAS POSTS --
// Criar posts com upload de arquivos (apenas usuários autenticados)
router.post('/post', isAuthenticated, upload.single('file'), new CreatePostController().handle);

// Listar posts por categoria
router.get('/category/posts', new ListByPostController().handle);

export { router };
