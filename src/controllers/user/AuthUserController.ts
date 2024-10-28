import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        try {
            const auth = await authUserService.execute({ email, password });
            return res.json(auth);
        } catch (error) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
    }
}

export { AuthUserController };
