import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserservice';


class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, role } = req.body;
        const user_id = req.user_id;  // ID do admin que está criando o usuário

        const createUserService = new CreateUserService();

        try {
            // Verificar se o usuário autenticado tem permissão para criar admins
            if (role === 'admin' && req.user_role !== 'admin') {
                return res.status(403).json({ error: "Somente administradores podem criar outros administradores" });
            }

            const user = await createUserService.execute({
                name,
                email,
                password,
                role // Passa o papel do novo usuário
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateUserController };