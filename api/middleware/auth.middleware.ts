import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string; // Add userRole to the request object
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: "Unauthorized - User not found" });
      return;
    }

    req.userId = decoded.userId;
    req.userRole = user.role; // Add user role to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
    return;
  }
};