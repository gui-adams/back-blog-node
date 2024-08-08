import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}


class AuthUserService{
    async execute({email, password}: AuthRequest){
  
    //vverificar se o email existe
    const user = await prismaClient.user.findFirst({
        where:{
            email: email
        }
    })

    if(!user){
        throw new Error("User/Password incorreto")
    }

    //Verificar se a senha se a senha está correta

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new Error("User/Password incorreto")

    }

    //gerar token JWT e devolver os dados do usuário como id

    const token = sign(
        {
            nome: user.name,
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '1d'
        }
    )

    return {
        id: user.id,
        name: user.name,
        token: token
    }
}
}
export {AuthUserService}