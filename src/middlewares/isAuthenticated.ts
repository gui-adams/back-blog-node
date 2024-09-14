// Middleware de autenticação (isAuthenticated.ts)
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub;  // Adiciona o ID do usuário à requisição
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
