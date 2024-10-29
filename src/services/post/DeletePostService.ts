import prismaClient from "../../prisma";

class DeletePostService {
    async execute(id: string) {
        const existingPost = await prismaClient.post.findUnique({ where: { id } });
        if (!existingPost) {
            throw new Error("Post não encontrado");
        }

        await prismaClient.post.delete({ where: { id } });
        return { message: "Post excluído com sucesso" };
    }
}

export { DeletePostService };
