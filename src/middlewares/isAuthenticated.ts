import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
  name: string;
  role: string;
}

// Middleware de autenticação unificado
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.session; // Obtém o token do cookie `session`

  if (!token) {
    return res.status(401).json({ error: "Token ausente. Acesso não autorizado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
    req.user = decoded; // Armazena o payload do token em `req.user`
    req.user_id = decoded.id;
    req.user_role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido. Acesso não autorizado." });
  }
}
