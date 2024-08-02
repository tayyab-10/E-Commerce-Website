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

});

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(       //checking the id of the user whose is adding the rating with the logged in user id
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {   //If isReviewed is true (i.e., the user has already reviewed the product), the function iterates through the reviews and updates the rating and comment for the existing review of the current user.
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;   //count of reviews
  }

  let sum = 0;

  product.reviews.forEach((rev) => {
    sum += rev.rating;
  });

  product.ratings = sum / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message:"Added Review Successfully"
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(   //The filter method is used to create a new array of reviews, excluding the review with the _id matching the id provided in the query parameters (req.query.id).
  //   req.query.id is the ID of the review to be deleted.
  
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message:"Review Deleted Successfully"
  });
});