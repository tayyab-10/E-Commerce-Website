import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddReview, clearError, getProductDetail } from '../../Actions/productAction';
import ProductCarousel from './ProductCarousel';
import ReviewCard from '../ReviewCard';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import { addItemsToCart } from '../../Actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from '@mui/material';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.addReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    const qty = quantity - 1;
    if (quantity > 1) setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to the Cart Successfully!!");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      setOpen(false);
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, alert, error, reviewError, success]);

  if (!product || !product.images) return <p>No product details available.</p>;

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(AddReview(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- DETAILS`} />
          <div className="bg-white w-full max-w-full p-[6vmax] box-border flex">
            <div className="w-full flex flex-col justify-evenly items-center p-[2vmax] box-border border border-white">
              <ProductCarousel images={product.images} className="w-[60vmax]" />
            </div>
            <div className="w-full flex flex-col justify-evenly items-start p-[2vmax] box-border border border-white">
              <div className="mb-[2vmax]">
                <h2 className="text-[#363636] font-semibold text-[1.6vmax]"> {product.name}</h2>
                <p className="text-[rgba(54,54,54,0.582)] font-light text-[0.6vmax] italic">Product # {product._id}</p>
              </div>
              <div className="flex justify-start items-center border-y border-black/[.205] w-[70%] py-[1vmax]">
                <Rating {...options} />
                <span className="ml-[2vmax] font-light text-[0.8vmax] italic text-[rgba(0,0,0,0.699)]">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="w-[70%]">
                <h1 className="text-[rgba(17,17,17,0.795)] font-normal text-[1.8vmax] mt-[1vmax] mb-[1vmax]">{`$${product.price}`}</h1>
                <div className="flex items-center mb-[1vmax]">
                  <div className="flex items-center">
                    <button onClick={decreaseQuantity} className="border-none bg-[rgba(0,0,0,0.616)] p-[0.5vmax] cursor-pointer text-white transition-all duration-500 hover:bg-[rgba(0,0,0,0.767)]">
                      -
                    </button>
                    <input
                      readOnly
                      value={quantity}
                      type="number"
                      className="border-none p-[0.6vmax] w-[4vmax] text-center outline-none font-normal text-[1.5vmax] text-[rgba(0,0,0,0.74)]"
                    />
                    <button onClick={increaseQuantity} className="border-none bg-[rgba(0,0,0,0.616)] p-[0.5vmax] cursor-pointer text-white transition-all duration-500 hover:bg-[rgba(0,0,0,0.767)]">
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className={`ml-[2vmax] bg-red-500 border-none cursor-pointer text-white transition-all duration-500 bg-tomato font-medium text-xs rounded-[20px] hover:bg-[rgb(185,64,42)] p-[0.5vmax_2vmax] outline-none}`}
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="border-y border-black/[.205] py-[1vmax] text-[rgba(0,0,0,0.651)] font-normal text-[1vmax] my-[1vmax]">
                  Status:
                  <b className={`${product.Stock < 1 ? "text-red-600" : "text-green-600"}`}>
                    {product.Stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
              </div>
              <div className="text-[rgba(0,0,0,0.897)] font-medium text-[1.2vmax]">
                Description : <p className="text-[rgba(0,0,0,0.534)] font-light text-[0.8vmax]">{product.description}</p>
              </div>
              <button
                disabled={false}
                onClick={submitReviewToggle}
                className="border-none bg-red-500 font-medium text-[1vmax] rounded-[20px] p-[0.6vmax_2vmax] mt-[1vmax] mb-[1vmax] text-white cursor-pointer transition-all duration-500 outline-none hover:bg-[rgb(185,64,42)] hover:scale-110">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="text-[#000000be] font-medium text-[1.4vmax] text-center border-b border-black/[.226] p-[1vmax] w-[20vmax] m-auto mb-[4vmax]">
            REVIEWS
          </h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent   style={{
 
    paddingTop: "0px", 
    marginTop: "-20px", 
  }}className="submitDialog mt-0">
              <Rating 
                onChange={(newRating) => setRating(newRating)}
                value={rating}
                size={35}
              
              />
              <textarea
              style={{marginTop:"1rem"}}
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="flex overflow-auto">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-[1.3vmax] font-normal text-center text-[rgba(0,0,0,0.548)] mb-[2vmax]">
              No Reviews Yet
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
