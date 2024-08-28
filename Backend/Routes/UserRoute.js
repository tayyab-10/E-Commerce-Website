const express=require("express");
const { registerUser, loginuser, logout, forgotPassword, resetPassword, GetUserDetails, updatePassword, updateProfile, getUsers, getSingleUser, updateUserRole, deleteUser } = require("../Controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const upload =require("../Middleware/multer");

const router=express.Router();


router.route("/register").post(upload.single('avatar'),registerUser);

router.route("/login").post(loginuser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/userdetail").get(isAuthenticatedUser,GetUserDetails);

router.route("/password/updatePassword").put(isAuthenticatedUser,updatePassword);

router.route("/updateProfile").put(upload.single('avatar'),isAuthenticatedUser,updateProfile);

router.route("/admin/getUsers").get(isAuthenticatedUser,authorizeRoles("admin"),getUsers);

router.route("/admin/getuser/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.route("/admin/updateUser/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
router.route("/admin/deleteUser/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);




module.exports =router;