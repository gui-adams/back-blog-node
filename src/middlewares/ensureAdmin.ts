import { NextFunction, Request, Response } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user_role !== "admin") {
        return res.status(403).json({ error: "Acesso negado, somente administradores" });
    }
    return next();
}
