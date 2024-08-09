import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    user_id?: string;  // ID do admin criando o usuário
}

class CreateUserService {
    async execute({ name, email, password, user_id }: UserRequest) {
        if (!email || !name || !password) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new Error("Usuário já existe");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return user;
    }
}

export { CreateUserService };
