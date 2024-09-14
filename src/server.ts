import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Lida com erros assíncronos de forma automática
import cors from 'cors';
import path from 'path';

import { router } from './routers'; // Suas rotas configuradas

const app = express();

// Middleware para permitir requisições de outros domínios (CORS)
app.use(cors());

// Middleware para entender JSON nas requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (como imagens de posts)
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
);

// Registrar as rotas
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Erros conhecidos (instâncias de Error)
    return res.status(400).json({
      error: err.message,
    });
  }
  // Erros desconhecidos (erros do servidor)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

// Iniciar o servidor na porta 4000
app.listen(4000, () => console.log('Servidor rodando na porta 4000'));
