import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/listProduct.model.js";

const orderReceived = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const orders = await Order.find({});
  console.log(orders);

  const orderArr = [];
  for (let order of orders) {
    if (id.toString() === order.seller.toString()) {
      const product = await Product.findById(order.product);

      const buyer = await User.findById(order.buyer);

      const seller = await User.findById(order.seller);

      const count = order.count;

      const obj = new Object();
      obj.product = product.name;
      obj.photo = product.photo;
      obj.price = product.price;
      obj.count = count;
      obj.seller = seller.userName;
      obj.buyer = buyer.userName;

      orderArr.push(obj);
    }
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orderArr,
        "Order received from backend to frontend successfully"
      )
    );
});

export { orderReceived };
