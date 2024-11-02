import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { router } from './routers';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Permite requisições do frontend
  credentials: true,               // Necessário para permitir o envio de cookies
}));

app.use(express.json());
app.use(cookieParser()); // Usa o cookie-parser no servidor
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
