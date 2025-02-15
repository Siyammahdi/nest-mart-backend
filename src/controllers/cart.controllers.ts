import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";

// 🛒 Get the user's cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.status(200).json(cart || { message: "Cart is empty", items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🛒 Add to Cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🛒 Update Cart Item Quantity
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    if (!userId || !productId || !quantity) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
      res.status(404).json({ error: "Product not in cart" });
      return;
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🛒 Remove an Item from Cart
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    if (!userId || !productId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🛒 Clear Cart
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      res.status(404).json({ error: "Cart already empty" });
      return;
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
