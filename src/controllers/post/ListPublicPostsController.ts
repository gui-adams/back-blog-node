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
          content: true,
          slug: true,
          published: true,
          image: true,
          post_category: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              }
            }
          }
        },
        orderBy: {
          created_at: 'desc', // Usa `created_at` conforme o modelo Prisma
        },
      });

      // Converter BigInt para String antes de enviar a resposta
      const serializedPosts = posts.map(post => ({
        ...post,
        id: String(post.id),
        post_category: post.post_category.map(pc => ({
          category: {
            ...pc.category,
            id: String(pc.category.id)
          }
        }))
      }));

      return res.json(serializedPosts);
    } catch (error) {
      console.error("Erro ao listar os posts:", error);
      return res.status(500).json({ error: "Erro ao listar os posts" });
    }
  }
}

export { ListPublicPostsController };
