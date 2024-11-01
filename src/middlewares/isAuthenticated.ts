import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
    role: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization || req.cookies?.session; // Tenta obter do header ou do cookie

    if (!authToken) {
        console.error("Token ausente no middleware. Redirecionando para login.");
        return res.status(401).json({ error: "Token ausente" });
    }

    const token = authToken.startsWith("Bearer") ? authToken.split(" ")[1] : authToken;

    try {
        const { sub, role } = verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user_id = sub;
        req.user_role = role;
        next();
    } catch (error) {
        console.error("Erro ao validar o token:", error);
        return res.status(401).json({ error: "Token inválido" });
    }
}


