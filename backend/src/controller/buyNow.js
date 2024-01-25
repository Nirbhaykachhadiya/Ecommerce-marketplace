import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/listProduct.model.js";

const buyNow = asyncHandler(async (req, res) => {
  const buyItemarr = req.body.cartItem;
  const user = await User.findById(req.user._id);

  for (let item of buyItemarr) {
    const product = await Product.findById(item.id);
    const count = item.count;

    const obj = new Object();
    obj._id = product;
    obj.count = count;

    user.purchasedProduct.push(obj);

    await Order.create({
      product: product,
      count: count,
      seller: product.seller,
      buyer: user,
    });
  }
  user.cartProduct = [];
  user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.purchasedProduct,
        "product stored in user-purchasedproduct"
      )
    );
});

export { buyNow };
