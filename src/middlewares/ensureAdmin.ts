import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import prismaClient from '../prisma';

interface Payload {
    sub: string;
}

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token missing" });
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

        // Buscando o usuário no banco de dados para verificar o papel
        const user = await prismaClient.user.findFirst({
            where: {
                id: sub,
            }
        });

        // Verificar se o usuário existe e se o papel dele é admin
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied" });
        }

        // Adiciona o userId no objeto de requisição para uso posterior
        req.user_id = sub;

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}
