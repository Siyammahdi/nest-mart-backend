import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface CartDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
}

const CartSchema = new Schema<CartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model<CartDocument>("Cart", CartSchema);
export default Cart;
