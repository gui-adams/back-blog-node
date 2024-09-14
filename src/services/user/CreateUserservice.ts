import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    role?: string;  // Novo campo para definir o papel do usuário (opcional)
    user_id?: string;  // ID do admin criando o usuário
}

class CreateUserService {
    async execute({ name, email, password, role = "user" }: UserRequest) {
        if (!email || !name || !password) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se o usuário já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new Error("Usuário já existe");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar o novo usuário, com a role sendo "user" por padrão
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                role,  // Definir o papel (user ou admin)
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,  // Incluir o papel na resposta
            }
        });

        return user;
    }
}

export { CreateUserService };
