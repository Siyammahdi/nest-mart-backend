import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    res.status(403).json({ error: "Forbidden - Admin access required" });
    return;
  }
  next();
};