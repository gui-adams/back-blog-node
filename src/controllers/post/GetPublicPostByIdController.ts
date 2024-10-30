// src/controllers/post/GetPublicPostByIdController.ts

import { Request, Response } from 'express';
import prismaClient from "../../prisma";

class GetPublicPostByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await prismaClient.post.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      return res.json(post);
    } catch (error) {
      console.error("Erro ao buscar o post:", error);
      return res.status(500).json({ error: "Erro ao buscar o post" });
    }
  }
}

export { GetPublicPostByIdController };
