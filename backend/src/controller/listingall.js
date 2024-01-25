import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const listingall = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({});
    console.log(products);
    if (!products || products.length === 0) {
      // If no products found
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No products found"));
    }

    const newProduct = [];

    for (let i of products) {
      const prod = await Product.findById(i._id);
      const user = await User.findById(prod.seller);
      const sellerName = user.userName;

      const obj = new Object();
      obj.id = prod._id;
      obj.name = prod.name;
      obj.price = prod.price;
      obj.photo = prod.photo;
      obj.seller = sellerName;

      newProduct.push(obj);
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          newProduct,
          "Products ready to be sent to frontend"
        )
      );
  } catch (error) {
    console.error("Error while fetching products:", error);
    next(new ApiError(500, "Internal Server Error"));
  }
});

export { listingall };
