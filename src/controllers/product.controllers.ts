import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find(); 
      res.status(200).json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product", details: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
    try {

      const {
        name,
        category,
        image,
        brand,
        price,
        originalPrice,
        discount,
        isNewProduct,
        tag,
        rating,
        stock,
        weight,
        sku,
        description,
        ingredients,
        nutritionalInfo,
        reviews,
      } = req.body;
  
      if (!name || !category || !price || !sku) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newProduct = new Product({
        name,
        category,
        image,
        brand,
        price,
        originalPrice,
        discount,
        isNewProduct,
        tag,
        rating,
        stock,
        weight,
        sku,
        description,
        ingredients,
        nutritionalInfo,
        reviews,
      });

      await newProduct.save();
  
      res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("❌ Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product", details: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product", details: error });
  }
};
