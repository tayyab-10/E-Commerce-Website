const Product=require("../Model/ProductModel");





//Create Product -- Admin can add product only
exports.createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

//Get all Products
exports.getAllProducts=async(req,res)=>{
  const product=await Product.find();

  res.status(200).json({
    success:true,
    product
  })
}

//Get a single product because a user can find a single product as well as admin

exports.getsingleProduct=async(req,res)=>{

    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
  
    res.status(200).json({
      success:true,
      product
    })
  }

//update products -- Admin can update the product only

exports.updateproduct=async(req,res)=>{

    let product = await Product.findById(req.params.id);   //we use let to change the current product

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
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
}

//Delete product -- Admin

exports.deleteproduct=async(req,res)=>{

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}