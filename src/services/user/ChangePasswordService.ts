import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

interface ChangePasswordRequest {
    user_id: string;
    currentPassword: string;
    newPassword: string;
}

class ChangePasswordService {
    async execute({ user_id, currentPassword, newPassword }: ChangePasswordRequest) {
        console.log("Iniciando alteração de senha para o usuário:", user_id);

        const user = await prismaClient.user.findUnique({ where: { id: user_id } });
        if (!user) {
            console.error("Usuário não encontrado no banco de dados.");
            throw new Error("Usuário não encontrado");
        }

        console.log("Usuário encontrado:", user);

        const passwordMatch = await compare(currentPassword, user.password);
        console.log("Senha atual corresponde?", passwordMatch);

        if (!passwordMatch) {
            console.error("Senha atual fornecida está incorreta.");
            throw new Error("Senha atual incorreta");
        }

        if (currentPassword === newPassword) {
            console.error("Nova senha igual à senha atual.");
            throw new Error("A nova senha não pode ser igual à senha atual.");
        }

        const newPasswordHash = await hash(newPassword, 8);
        console.log("Nova senha hash gerada com sucesso.");

        await prismaClient.user.update({
            where: { id: user_id },
            data: { password: newPasswordHash },
        });

        console.log("Senha alterada com sucesso para o usuário:", user_id);

        return { message: "Senha alterada com sucesso" };
    }
}

export { ChangePasswordService };
