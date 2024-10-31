import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/user/ChangePasswordService";

class ChangePasswordController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { currentPassword, newPassword } = req.body;

        const changePasswordService = new ChangePasswordService();

        try {
            await changePasswordService.execute({ user_id, currentPassword, newPassword });
            return res.json({ message: "Senha alterada com sucesso" });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ChangePasswordController };
