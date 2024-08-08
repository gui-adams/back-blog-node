import {Request, Response} from 'express'
import {CreateUserService} from '../../services/user/CreateUserservice'


class CreateUserController{
    async handle (req: Request, res: Response){
        const {name, email, password } = req.body;
        const userId = req.userId;  // Isso será populado pelo middleware ensureAdmin


        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(user)
    }
}

export { CreateUserController };