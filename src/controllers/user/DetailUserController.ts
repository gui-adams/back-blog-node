import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute(user_id);

        // Agora estamos retornando "id", "name" e "role"
        return res.json({
            id: user.id,
            name: user.name,   // Retornando o nome do usuário
            role: user.role,   // Retornando o papel do usuário (admin ou user)
        });
    }
}

export { DetailUserController };
