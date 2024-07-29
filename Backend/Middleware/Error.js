const ErrorHandler=require("../utiles/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error"

  // Wrong Mondodb ID error -- If i add the wrong id it will give me this short error message
    if(err.name =="CastError"){
        const message=`Resource not Found. Invalid : ${err.path}`
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    })
}