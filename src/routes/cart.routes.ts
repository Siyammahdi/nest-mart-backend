import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cart.controllers";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateUser, getCart);
router.post("/add", authenticateUser, addToCart);
router.put("/update/:productId", authenticateUser, updateCartItem);
router.delete("/remove/:productId", authenticateUser, removeFromCart);
router.delete("/clear", authenticateUser, clearCart);

export default router;
