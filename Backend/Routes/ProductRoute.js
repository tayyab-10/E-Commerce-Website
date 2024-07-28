const express=require("express");
const { getAllProducts, createProduct, updateproduct, deleteproduct, getsingleProduct } = require("../Controllers/productController");

const router=express.Router();


router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateproduct);  //we cannot get id from the auth token we have to give it in the url
router.route("/products/:id").delete(deleteproduct);
router.route("/products/:id").get(getsingleProduct);



module.exports=router;