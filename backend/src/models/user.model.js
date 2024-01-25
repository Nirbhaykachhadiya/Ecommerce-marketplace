import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Product } from "./product.model.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    sellProduct: [
      {
        type: Schema.Types.ObjectId,
        ref: Product,
      },
    ],
    purchasedProduct: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: Product,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
    cartProduct: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: Product,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
    },
    "nirbhay",
    {
      expiresIn: "1D",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    "kachhadiya",
    {
      expiresIn: "10D",
    }
  );
};
export const User = mongoose.model("User", userSchema);
