import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("User/Password incorreto");
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("User/Password incorreto");
        }

        // Gerar token JWT e incluir o papel do usuário (role)
        const token = sign(
            {
                nome: user.name,
                role: user.role,  // Incluindo o papel do usuário no token
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return {
            id: user.id,
            token: token
        };
    }
}

export { AuthUserService };
