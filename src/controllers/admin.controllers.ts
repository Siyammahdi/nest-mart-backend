import { Request, Response } from "express";

export const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "Welcome to the Admin Dashboard" });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};