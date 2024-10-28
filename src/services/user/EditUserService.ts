import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface EditUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

class EditUserService {
    async execute({ id, name, email, password, role }: EditUserRequest) {
        const data: any = {};

        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = await hash(password, 8);
        if (role) data.role = role;

        const user = await prismaClient.user.update({
            where: { id },
            data,
            select: { id: true, name: true, email: true, role: true },
        });

        return user;
    }
}

export { EditUserService };
