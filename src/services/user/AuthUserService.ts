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
        if (!user) throw new Error("User/Password incorreto");

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) throw new Error("User/Password incorreto");

        const token = sign(
            { name: user.name, role: user.role },
            process.env.JWT_SECRET as string,
            { subject: user.id, expiresIn: "1d" }
        );

        return { id: user.id, token };
    }
}

export { AuthUserService };
