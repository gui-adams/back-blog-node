// services/user/AuthUserService.ts
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        const user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) throw new Error("Usuário ou senha incorretos");

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) throw new Error("Usuário ou senha incorretos");

        const token = sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        return { id: user.id, token };
    }
}

export { AuthUserService };
