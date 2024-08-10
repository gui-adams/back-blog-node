import { Router } from 'express';

import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryControllers } from './controllers/category/CreateCategoryControllers';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import {CreatePostController} from './controllers/post/CreatePostController'
import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROTAS USERS --
router.post('/users', ensureAdmin, new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --

router.post('/category',isAuthenticated, new CreateCategoryControllers().handle)
router.get('/category',isAuthenticated, new ListCategoryController().handle)

// -- ROTAS POSTS --

router.post('/post',isAuthenticated, upload.single('file'), new CreatePostController().handle)



export { router };
