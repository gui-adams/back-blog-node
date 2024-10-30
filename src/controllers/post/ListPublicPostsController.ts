// src/controllers/post/ListPublicPostsController.ts

import { Request, Response } from 'express';
import prismaClient from "../../prisma";

class ListPublicPostsController {
  async handle(req: Request, res: Response) {
    try {
      const posts = await prismaClient.post.findMany({
        select: {
          id: true,
          title: true,
          banner: true,
          description: true,
          conteudo: true,
          category: {
            select: {
              name: true,
            },
          },
          author_id: true,
        },
        orderBy: {
          created_at: 'desc', // Usa `created_at` conforme o modelo Prisma
        },
      });

      return res.json(posts);
    } catch (error) {
      console.error("Erro ao listar os posts:", error);
      return res.status(500).json({ error: "Erro ao listar os posts" });
    }
  }
}

export { ListPublicPostsController };
