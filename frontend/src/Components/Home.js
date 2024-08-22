import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import backgroundImage from "../images/cover.png";
import { getProduct } from "../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
import {useAlert} from "react-alert"
import ProductCard from "./Product/ProductCard";
const Home = () => {

  const alert=useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);  // pulled state from the store

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="bg-cover bg-center bg-no-repeat h-[100vmin] flex flex-col text-center items-center justify-center text-white relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <p className="font-light text-[1.4vmax]">Welcome to Ecommerce</p>
            <h1 className="font-bold text-[2.5vmax] my-[5vmax]">FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button className="mb-[5vmax] cursor-pointer text-center bg-white border border-white rounded-none p-[1vmax] transition-all duration-500 w-[9vmax] font-medium flex flex-row text-lg text-black hover:bg-transparent hover:text-white">
                Scroll <CgMouse className="ml-2 mt-1" />
              </button>
            </a>
            <div
              className="absolute top-0 left-0 w-full h-full bg-white"
              style={{ clipPath: "polygon(100% 68%, 0 100%, 100% 100%)" }}
            ></div>
          </div>

          <h2 className="items-center justify-center text-center">Featured Products</h2>

          <div className="flex flex-wrap justify-center mx-auto my-8 w-[80vw] max-w-full">
            {products  && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
