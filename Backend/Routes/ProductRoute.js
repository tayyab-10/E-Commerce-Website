const express=require("express");
const { getAllProducts, createProduct, updateproduct, deleteproduct, getsingleProduct } = require("../Controllers/productController");
const { isAuthenticatedUser,authorizeRoles} = require("../Middleware/auth");

const router=express.Router();


router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateproduct);  //we cannot get id from the auth token we have to give it in the url

router.route("/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct);

router.route("/products/:id").get(getsingleProduct);



module.exports=router;