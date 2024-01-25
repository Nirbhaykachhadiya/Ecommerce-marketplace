import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const AccessandRefressTokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch {
    throw new ApiError(500, "error accuring during creating access & refresh");
  }
};

const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    throw new ApiError(400, "plz enter username or emaii");
  }
  const user = await User.findOne({ userName });
  if (!password) {
    throw new ApiError(400, "password is must for login");
  }
  const passwordCheking = await user.isPasswordCorrect(password);

  if (!passwordCheking) {
    throw new ApiError(404, "credintial wrong");
  }

  const { accessToken, refreshToken } = await AccessandRefressTokenGenerator(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Loggin SuccessFully"
      )
    );
});
export { login };
