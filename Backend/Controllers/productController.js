const Product=require("../Model/ProductModel");
const ErrorHandler = require("../utiles/errorhandler");
const catchAsyncError=require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utiles/ApiFeatures");



//Create Product -- Admin can add product only
exports.createProduct=catchAsyncError(async(req,res,next)=>{

    req.body.user=req.user.id;
    const product=await Product.create(req.body) 

    res.status(201).json({
        success:true,
        product
    })
})

//Get all Products
exports.getAllProducts=catchAsyncError(async(req,res)=>{
    console.log("Query String:", req.query); // Debugging log
    const resultPerPage=5;
    const productCount=await Product.countDocuments();
    const apifeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const product=await apifeatures.query;
  
    res.status(200).json({
      success:true,
      product,
      productCount
    })
  })

//Get a single product because a user can find a single product as well as admin

exports.getsingleProduct=catchAsyncError(async(req,res,next)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success:true,
      product
    })
  })

//update products -- Admin can update the product only

exports.updateproduct=catchAsyncError(async(req,res)=>{

    let product = await Product.findById(req.params.id);   //we use let to change the current product

    if(!product){
      return next(new ErrorHandler("Product not found",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true, 
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})

//Delete product -- Admin

exports.deleteproduct=catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404))
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });

} 
)