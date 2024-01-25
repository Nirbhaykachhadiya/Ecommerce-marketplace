import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";


const buyUserProduct=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)

    const buyProductArr=[]
    for(let item of user.purchasedProduct){
        const count=item.count
        const product=await Product.findById(item._id)

        const obj =new Object()
        obj.count=count
        obj.name=product.name
        obj.price=product.price
        obj.photo=product.photo
        buyProductArr.push(obj)
    }

    res.status(200).json(new ApiResponse(200,buyProductArr,"buyproduct user backend to frontend"))

})

export {buyUserProduct}