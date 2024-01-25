import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";

import { register } from "../controller/register.js";
import { login } from "../controller/login.js";
import { logout } from "../controller/logout.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct } from "../controller/addProduct.js";
import { userListed } from "../controller/userListed.js";
import { listingall } from "../controller/listingall.js";
import { addcart } from "../controller/addcart.js";
import { cartProduct } from "../controller/cartproductfrontend.js";
import { buyNow } from "../controller/buyNow.js";
import { buyUserProduct } from "../controller/buyUserProduct.js";
import { orderReceived } from "../controller/orderReceived.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(varifyJWT, logout);
router.route("/addproduct").post(varifyJWT, upload.single("image"), addProduct);
router.route("/userlisted").post(varifyJWT, userListed);
router.route("/listingall").get(listingall);
router.route("/addcart").post(varifyJWT, addcart);
router.route("/cartproduct").post(varifyJWT, cartProduct);
router.route("/buynow").post(varifyJWT, buyNow);
router.route("/buyuserproduct").post(varifyJWT, buyUserProduct);
router.route("/orderreceived").post(varifyJWT, orderReceived);
orderReceived

export default router;
