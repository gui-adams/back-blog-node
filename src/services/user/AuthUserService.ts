import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verifica se o usuário existe no banco de dados
        const user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) throw new Error("Usuário ou senha incorretos");

        // Compara a senha fornecida com o hash salvo no banco de dados
        const passwordMatch = await compare(password, user.password);
        console.log("Senha correta?", passwordMatch);
        if (!passwordMatch) throw new Error("Usuário ou senha incorretos");

        // Gera o token JWT
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT Secret não configurado");
        }

        const token = sign(
            { name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { subject: user.id, expiresIn: "1d" }
        );

        return { id: user.id, token };
    }
}

export { AuthUserService };
