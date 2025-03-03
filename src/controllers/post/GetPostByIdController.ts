import { Request, Response } from 'express';
import prismaClient from "../../prisma";

class GetPostByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await prismaClient.post.findUnique({
        where: { id: BigInt(id) },
        include: { 
          post_category: {
            include: {
              category: true
            }
          }
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      // Serializar o post antes de enviar
      const serializedPost = {
        ...post,
        id: String(post.id),
        post_category: post.post_category.map(pc => ({
          ...pc,
          post_id: String(pc.post_id),
          category_id: String(pc.category_id),
          category: {
            ...pc.category,
            id: String(pc.category.id)
          }
        }))
      };

      return res.json(serializedPost);
    } catch (error) {
      console.log('Error: ', error)
      return res.status(500).json({ error: "Erro ao buscar o post" });
    }
  }
}

export { GetPostByIdController };
