import mongoose, { Schema, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    isNewProduct: { type: Boolean, required: true },
    tag: { type: String, required: false },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    weight: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    nutritionalInfo: {
      calories: { type: Number, required: true },
      protein: { type: String, required: true },
      fat: { type: String, required: true },
      carbohydrates: { type: String, required: true },
      fiber: { type: String, required: true },
    },
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Automatically infer TypeScript types from the schema
type IProduct = InferSchemaType<typeof ProductSchema>;

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
