import express from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { getAdminDashboard } from "../controllers/admin.controllers";

const router = express.Router();

// Protect the admin dashboard route
router.get("/dashboard", authenticateUser, isAdmin, getAdminDashboard);

export default router;