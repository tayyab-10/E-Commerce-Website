const express=require("express");
const { registerUser, loginuser, logout, forgotPassword, resetPassword, GetUserDetails, updatePassword, updateProfile, getUsers, getSingleUser, updateUserRole, deleteUser } = require("../Controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginuser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/mydetail").get(isAuthenticatedUser,GetUserDetails);

router.route("/password/updatePassword").put(isAuthenticatedUser,updatePassword);

router.route("/updateProfile").put(isAuthenticatedUser,updateProfile);

router.route("/admin/getUsers").get(isAuthenticatedUser,authorizeRoles("admin"),getUsers);

router.route("/admin/getuser/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);




module.exports =router;