import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

interface ChangePasswordRequest {
    user_id: string;
    currentPassword: string;
    newPassword: string;
}

class ChangePasswordService {
    async execute({ user_id, currentPassword, newPassword }: ChangePasswordRequest) {
        const user = await prismaClient.user.findUnique({ where: { id: user_id } });

        if (!user) throw new Error("Usuário não encontrado");

        const passwordMatch = await compare(currentPassword, user.password);
        if (!passwordMatch) throw new Error("Senha atual incorreta");

        const newPasswordHash = await hash(newPassword, 8);
        await prismaClient.user.update({
            where: { id: user_id },
            data: { password: newPasswordHash },
        });

        return { message: "Senha alterada com sucesso" };
    }
}

export { ChangePasswordService };
