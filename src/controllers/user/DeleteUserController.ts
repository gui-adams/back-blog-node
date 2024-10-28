import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deleteUserService = new DeleteUserService();

        try {
            const result = await deleteUserService.execute(id);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteUserController };
