import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    userId?: string;  // Adiciona o userId opcionalmente
}

class CreateUserService {
    async execute({ name, email, password, userId }: UserRequest) {
        if (!email) {
            throw new Error("Email Incorreto");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("User já existe");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
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
