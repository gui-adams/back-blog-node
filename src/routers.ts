import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

// -- ROTAS USERS --
router.post('/users', ensureAdmin, new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

export { router };
