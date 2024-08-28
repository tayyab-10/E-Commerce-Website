const express=require("express");
const { getAllProducts, createProduct, updateproduct, deleteproduct, getsingleProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../Controllers/productController");
const { isAuthenticatedUser,authorizeRoles} = require("../Middleware/auth");
const upload =require("../Middleware/multer");
const router=express.Router();


router.route("/products").get(getAllProducts);

router.route("/createProduct").post(isAuthenticatedUser,upload.single('images'),authorizeRoles("admin"),createProduct);

router.route("/updateproduct/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateproduct);  //we cannot get id from the auth token we have to give it in the url

router.route("/deleteproduct/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct);

router.route("/getallproducts").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);

router.route("/product/:id").get(getsingleProduct);

router.route("/review").post(isAuthenticatedUser,createProductReview)

router.route("/deletereview").delete(isAuthenticatedUser,deleteReview);

router.route("/getAllReviews").get(getProductReviews);

module.exports=router;