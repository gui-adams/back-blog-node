import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserservice';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const user_id = req.user_id;  // Isso será populado pelo middleware ensureAdmin

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({
                name,
                email,
                password,
                user_id,  // Passa o ID do admin que está criando o usuário
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateUserController };
