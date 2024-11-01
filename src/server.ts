import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import { router } from './routers';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://simpleway.tech'], // Permite localhost (para desenvolvimento) e o domínio em produção
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true // Inclui cookies e cabeçalhos de autenticação, se necessário
}));

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Registrar as rotas unificadas
app.use(router);

// Middleware global de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
