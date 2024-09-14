import { Request } from 'express';

// Extender a interface Request para incluir user_id e user_role
declare module 'express-serve-static-core' {
  interface Request {
    user_id?: string;  // ID do usuário autenticado
    user_role?: string; // Papel do usuário autenticado (user ou admin)
  }
}
