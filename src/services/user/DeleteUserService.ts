import prismaClient from "../../prisma";

class DeleteUserService {
    async execute(id: string) {
        await prismaClient.user.delete({
            where: { id },
        });
        return { message: "Usuário excluído com sucesso" };
    }
}

export { DeleteUserService };
