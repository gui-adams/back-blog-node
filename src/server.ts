import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import { router } from './routers';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Registrar as rotas unificadas
app.use(router);

// Middleware global de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
