// controllers/user/AuthUserController.ts
import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const authUserService = new AuthUserService();

        try {
            const { token } = await authUserService.execute({ email, password });

            // Configura o cookie HTTP-only
            res.cookie("session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000, // 1 dia em milissegundos
                path: "/",
            });

            return res.status(200).json({ message: "Login realizado com sucesso" });
        } catch (error) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
    }
}

export { AuthUserController };
