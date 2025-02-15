import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware"; 
import User from "../models/user.model";

export const getUserDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId; 

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};