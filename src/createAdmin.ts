// createUsers.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUsers() {
  // Criptografa as senhas
  const passwordGuilherme = await bcrypt.hash('windows99', 10);
  const passwordJessica = await bcrypt.hash('windows99', 10);

  try {
    // Cria o usuário Guilherme
    const guilherme = await prisma.user.create({
      data: {
        name: 'Guilherme Adams',
        email: 'guilherme.adams@live.com',
        password: passwordGuilherme,
        role: 'admin',
      },
    });

    console.log('Usuário Guilherme criado:', guilherme);

    // Cria o usuário Jessica
    const jessica = await prisma.user.create({
      data: {
        name: 'Jessica Camargo',
        email: 'jessica.camargo@simpleway.tech',
        password: passwordJessica,
        role: 'admin',
      },
    });

    console.log('Usuário Jessica criado:', jessica);
  } catch (error) {
    console.error('Erro ao criar os usuários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();
