import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { categoryRoutes } from './categoryRoutes';
import { postRoutes } from './postRoutes';

const router = Router();

// Agrupamento de rotas de diferentes módulos
router.use(userRoutes);
router.use(categoryRoutes);
router.use(postRoutes);

export { router };
