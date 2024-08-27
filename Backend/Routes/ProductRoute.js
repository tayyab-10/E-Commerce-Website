const express=require("express");
const { getAllProducts, createProduct, updateproduct, deleteproduct, getsingleProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../Controllers/productController");
const { isAuthenticatedUser,authorizeRoles} = require("../Middleware/auth");

const router=express.Router();


router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateproduct);  //we cannot get id from the auth token we have to give it in the url

router.route("/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct);

router.route("/getallproducts").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);

router.route("/product/:id").get(getsingleProduct);

router.route("/review").post(isAuthenticatedUser,createProductReview).delete(isAuthenticatedUser,deleteReview);

router.route("/getAllReviews").get(getProductReviews);

module.exports=router;