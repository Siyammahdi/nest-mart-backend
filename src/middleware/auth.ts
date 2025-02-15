// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// export interface AuthRequest extends Request {
//   user?: { id: string };
// }

// export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     res.status(401).json({ error: "Access denied. No token provided." });
//     return; // 🔹 Ensure function exits after sending a response
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//     req.user = { id: decoded.id };
//     next(); // ✅ Call `next()` to pass control to the next middleware
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token" });
//     return; // 🔹 Ensure function exits after sending a response
//   }
// };
