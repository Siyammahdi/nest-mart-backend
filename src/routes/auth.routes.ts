import express from "express";
import { signup, login, createAdmin } from "../controllers/auth.controllers";
import { authenticateUser } from "../middleware/auth.middleware";
import { getUserDetails } from "../controllers/user.controllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-admin", createAdmin); // Add this route

router.get("/me", authenticateUser, getUserDetails); // Add this line

export default router;
