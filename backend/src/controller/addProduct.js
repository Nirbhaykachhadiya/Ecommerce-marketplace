import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const userid = req.user._id;
  // console.log(body);
  // console.log(req.file);
  const avatarlocalpath = req.file.path;
  console.log(avatarlocalpath);
  if (!avatarlocalpath) {
    throw new ApiError(400, "avatar is must locally");
  }

  const avatar = await uploadOnCloudinary(avatarlocalpath);
  if (!avatar) {
    throw new ApiError(400, "avatar is must cloudnary");
  }
  const user = await User.findById(userid);

  const product = await Product.create({
    name: name,
    price: price,
    photo: avatar.url,
    seller: user,
  });

  const createdProduct = await Product.findById(product._id);
  if (!createdProduct) {
    throw new ApiError(
      500,
      "something went wrong while register on creating product"
    );
  }

  user.sellProduct.push(createdProduct);
  user.save({ validateBeforeSave: false });
  console.log(user);

  res
    .status(200)
    .json(200, createdProduct, { message: "Product added successfully" });
});

export { addProduct };
