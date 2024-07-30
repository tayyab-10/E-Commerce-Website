 const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const Jwt=require("jsonwebtoken");
const user=require("../Model/Usermodel")

exports.isAuthenticatedUser=catchAsyncErrors( async(req,res,next)=>{
    const {token}=req.cookies;  //we have dowloaded the cookie-parcer to get the token

    if(!token){
        return next(new ErrorHandler("PLease login to access this resource",401));
    }

    const decodedata=Jwt.verify(token,process.env.JWT_SECRET);

    req.user =await user.findById(decodedata.id)
    next(); 
})


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {  //include checks if the given role found in the user if it is equal then it return true
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };