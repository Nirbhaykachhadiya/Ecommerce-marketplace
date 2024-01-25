import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const cartProduct = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  const user = await User.findById(userid);

  const arr = [];

  for (let i of user.cartProduct) {
    const product = await Product.findById(i._id);
    const obj = new Object();
    obj.id = product._id;
    obj.name = product.name;
    obj.price = product.price;
    obj.photo = product.photo;
    obj.count = i.count;

    arr.push(obj);
  }

  res
    .status(200)
    .json(new ApiResponse(200, arr, "cart item backendtofrontend"));
});

export { cartProduct };
