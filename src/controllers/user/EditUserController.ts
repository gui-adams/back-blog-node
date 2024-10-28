import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";

class EditUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const editUserService = new EditUserService();

        try {
            const user = await editUserService.execute({ id, name, email, password, role });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditUserController };
