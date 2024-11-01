import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface EditUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

class EditUserService {
    async execute({ id, name, email, password, role }: EditUserRequest) {
        // Verifica se o usuário existe no banco de dados
        const userExists = await prismaClient.user.findUnique({ where: { id } });
        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        // Valida se ao menos um campo foi fornecido para atualizar
        if (!name && !email && !password && !role) {
            throw new Error("Nenhuma alteração foi fornecida para atualizar o usuário");
        }

        const data: any = {};

        // Verifica se o e-mail já está em uso por outro usuário
        if (email) {
            const emailExists = await prismaClient.user.findUnique({ where: { email } });
            if (emailExists && emailExists.id !== id) {
                throw new Error("Este e-mail já está em uso por outro usuário");
            }
            data.email = email;
        }

        // Valida e cria um hash para a senha nova, se for alterada
        if (password) {
            if (password.length < 8) {
                throw new Error("A nova senha deve ter pelo menos 8 caracteres");
            }
            data.password = await hash(password, 8);
        }

        if (name) data.name = name;
        if (role) data.role = role;

        // Atualiza o usuário no banco de dados
        try {
            const user = await prismaClient.user.update({
                where: { id },
                data,
                select: { id: true, name: true, email: true, role: true },
            });

            return user;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error("Erro ao atualizar usuário");
        }
    }
}

export { EditUserService };
