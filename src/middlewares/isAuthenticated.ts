import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
    role: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authToken.split(" ");
    try {
        const { sub, role } = verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user_id = sub;  // Configura author_id
        req.user_role = role;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
