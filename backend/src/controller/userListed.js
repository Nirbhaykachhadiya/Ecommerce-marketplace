import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const userListed = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const productIds = user.sellProduct;
  const arr = [];

  for (let productid of productIds) {
    const product = await Product.findById(productid);
    arr.push(product);
  }

  res
    .status(200)
    .json(new ApiResponse(200, arr, "fetch user listing successfully"));
});
export { userListed };
