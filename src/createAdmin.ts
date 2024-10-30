// createAdmin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  // Criptografa a senha "windows99"
  const hashedPassword = await bcrypt.hash('windows99', 10);

  try {
    // Cria o usuário administrador
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'guilherme.adams@live.com',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Usuário administrador criado:', admin);
  } catch (error) {
    console.error('Erro ao criar o usuário administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
