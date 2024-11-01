import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/user/ChangePasswordService";

class ChangePasswordController {
    async handle(req: Request, res: Response) {
        console.log("ID do usuário recebido no controlador:", req.user_id);

        const user_id = req.user_id;
        if (!user_id) {
            console.error("Usuário não autenticado. Falta o user_id.");
            return res.status(401).json({ error: "Usuário não autenticado. Faça login novamente." });
        }

        const { currentPassword, newPassword } = req.body;
        console.log("Dados recebidos para alterar senha:", { user_id, currentPassword, newPassword });

        if (!currentPassword || !newPassword) {
            console.error("Dados inválidos: currentPassword ou newPassword ausente");
            return res.status(400).json({ error: "Dados inválidos. Senhas necessárias." });
        }

        const changePasswordService = new ChangePasswordService();

        try {
            await changePasswordService.execute({ user_id, currentPassword, newPassword });
            console.log("Senha alterada com sucesso para o usuário:", user_id);
            return res.json({ message: "Senha alterada com sucesso" });
        } catch (error: any) {
            console.error("Erro ao alterar a senha:", error.message);
            return res.status(400).json({ error: error.message || "Erro ao alterar senha" });
        }
    }
}


export { ChangePasswordController };
