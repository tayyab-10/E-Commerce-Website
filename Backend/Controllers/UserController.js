const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError=require("../Middleware/catchAsyncErrors");
const User=require("../Model/Usermodel")
const bcrypt=require("bcryptjs")
const sendToken=require("../utiles/jwtToken");
const sendEmail = require("../utiles/email");
const crypto=require("crypto")
const cloudinary=require("cloudinary")
const fs = require('fs');
const path = require('path');


//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Avatar is required',
    });
  }
  
  const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });


  fs.unlink(req.file.path, (err) => {
    if (err) {
        console.error('Error while deleting the file:', err);
    } else {
        console.log('File successfully deleted from local directory');
    }
});

  const { name, email, password } = req.body;

 
  const user = await User.create({
    name,
    email,
    password, 
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

 
  sendToken(user, 201, res);
});

// Login a useris
exports.loginuser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    // Find user in database
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("Invalid Email & Password", 401));
    }

    // Check if password matches
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email & Password", 401));
    }

    // Get JWT token
    sendToken(user,200,res);
});

//logout User 
exports.logout=catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
});

// Forgot Password 

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });

  // Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get user Details
exports.GetUserDetails=catchAsyncError(async(req,res,next)=>{
  
  const user =await User.findById(req.user.id);

   res.status(200).json({
      success:true,
      user
   })
})

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");  //req.user.id == isAuthenticated user ma sy ayi gi 

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile   h
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
  

//Get all users (Admin)

exports.getUsers=catchAsyncError(async(req,res,next) =>{

  const user=await User.find();

  if(!user){
    return next(new ErrorHandler("There are no Registered Users",400))
  }

  res.status(200).json({
    success:true,
    user
  })
})

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`) // params will get the id provided in the url id
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update User Role -- Admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  // await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});