import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden - Admin access required' });
      return; 
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next(); 
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};