import mongoose, { Schema } from "mongoose";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: Product,
    },
    count: {
      type: Number,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
