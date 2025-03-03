import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    role?: string;
}

class CreateUserService {
    async execute({ name, email, password, role = "user" }: UserRequest) {        
        if (!email || !name || !password) {
            throw new Error("Todos os campos são obrigatórios 1");
        }

        const userAlreadyExists = await prismaClient.users.findFirst({ where: { email } });
        if (userAlreadyExists) throw new Error("Usuário já existe");

        const passwordHash = await hash(password, 8);
        const user = await prismaClient.users.create({
            data: { name, email, password: passwordHash, role },
            select: { id: true, name: true, email: true, role: true },
        });

        return user;
    }
}

export { CreateUserService };
