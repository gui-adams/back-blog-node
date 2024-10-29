import { Request, Response } from 'express';
import prismaClient from "../../prisma";

class GetPostByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await prismaClient.post.findUnique({
        where: { id },
        include: { category: true }, // Inclui categoria, se necessário
      });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      return res.json(post);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar o post" });
    }
  }
}

export { GetPostByIdController };
