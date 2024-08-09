import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
            }
        })
        return user;
    }
}
export {DetailUserService}