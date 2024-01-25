import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const addcart = asyncHandler(async (req, res) => {
  const productid = req.body.id;
  const plusminus = req.body.plus;
  const product = await Product.findById(productid);
  const userid = req.user._id;
  const user = await User.findById(userid);

  if (plusminus === "simple") {
    let count = 0;
    for (let item of user.cartProduct) {
      console.log("item is of simple ", item._id);

      if (productid === item._id.toString()) {
        const index = user.cartProduct.indexOf(item);
        user.cartProduct[index].count += 1;
        count += 1;
      }
    }
    if (count === 0) {
      const obj = new Object();
      obj.count = 1;
      obj._id = product;
      user.cartProduct.push(obj);
    }

    user.save({ validateBeforeSave: false });
  }

  if (plusminus.toString() === "plus") {
    for (let item of user.cartProduct) {
      console.log("item is of plus ", item._id);

      if (productid === item._id.toString()) {
        const index = user.cartProduct.indexOf(item);
        user.cartProduct[index].count += 1;
      }
    }
    user.save({ validateBeforeSave: false });
  }

  if (plusminus.toString() === "minus") {
    for (let item of user.cartProduct) {
      console.log("item is of minus ", item._id);

      if (productid === item._id.toString()) {
        const index = user.cartProduct.indexOf(item);
        if (user.cartProduct[index].count > 0) {
          user.cartProduct[index].count -= 1;
        } else {
          user.cartProduct[index].count -= 0;
        }
      }
    }
    user.save({ validateBeforeSave: false });
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.cartProduct,
        "product push into cart successfully"
      )
    );
});

export { addcart };
