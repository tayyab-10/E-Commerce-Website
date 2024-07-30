const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError=require("../Middleware/catchAsyncErrors");
const User=require("../Model/Usermodel")
const bcrypt=require("bcryptjs")
const sendToken=require("../utiles/jwtToken")
//Register a user

exports.registerUser=catchAsyncError( async(req,res,next)=>{

    const {name,email,password}=req.body;

    const user= await User.create({
         name,email,password,
        avatar:{
            public_id:"This is a Sample Id",
            url: "url"
        }

    })

    sendToken(user,201,res);
})

// Login a user
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

//logour User 
exports.logout=catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

