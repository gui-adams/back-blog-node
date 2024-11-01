import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
    role: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    // Verifica se o token foi fornecido
    if (!authToken) {
        console.error("Erro: Token não fornecido");
        return res.status(401).json({ error: "Token não fornecido" });
    }

    // Extraindo o token
    const [, token] = authToken.split(" ");

    try {
        // Verifica o token e extrai o payload
        const { sub, role } = verify(token, process.env.JWT_SECRET as string) as Payload;

        console.log("Token verificado, payload:", { sub, role });

        req.user_id = sub; // Define o user_id no request
        req.user_role = role;
        return next();
    } catch (error) {
        console.error("Erro ao validar o token:", error);
        return res.status(401).json({ error: "Token inválido" });
    }
}
