import { Request, Response } from 'express';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const userExists = await prismaClient.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role,
        },
      });

      return res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}
