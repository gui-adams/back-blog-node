import { Request, Response } from 'express';
import prismaClient from '../../prisma';

export class ListUsersController {
  async handle(req: Request, res: Response) {
    try {
      const users = await prismaClient.user.findMany({
        select: { id: true, name: true, email: true, role: true },
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
}
