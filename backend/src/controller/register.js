import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const register = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(
      401,
      "userName or Password is not getting from frontend"
    );
  }
  const exist = await User.findOne({ userName });
  if (exist) {
    throw new ApiError(401, "User Already Exists");
  }
  const user = await User.create({
    userName,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user Register Successfully"));
});

export { register };
