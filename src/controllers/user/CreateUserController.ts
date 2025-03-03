import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {

        const { name, email, password, role } = req.body;

        // Usuário autenticado e role extraídos do token
        let { user_role } = req;

        if (role === "admin" && user_role !== "admin") {
            return res.status(403).json({ error: "Somente administradores podem criar outros administradores" });
        }

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ name, email, password, role });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateUserController };
