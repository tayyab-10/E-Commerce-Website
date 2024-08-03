const express=require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../Controllers/Ordercontroller");


const router=express.Router();

router.route("/neworder").post(isAuthenticatedUser,newOrder);

router.route("/singleOrder").get(isAuthenticatedUser,getSingleOrder);

router.route("/getallOrders").get(isAuthenticatedUser,myOrders);

router.route("/admin/getOrders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/updateOrder/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);



module.exports=router;

