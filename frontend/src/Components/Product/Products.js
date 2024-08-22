import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearError, getProduct } from '../../Actions/productAction';
import Loader from '../Loader/Loader';
import Paginationbox from '../pagination';
import { Slider, Typography } from '@mui/material';
import MetaData from '../Layout/MetaData';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentpage, setcurrentpage] = useState(1);
  const [price, setprice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, resultperpage, productsCount, filteredProductsCount } = useSelector((state) => state.products);  // pulled state from the store
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentpage(e);
  };

  const priceHandler = (event, newprice) => {
    setprice(newprice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError())
    }
    // const ratingFilter = ratings > 0 ? ratings : undefined;
    dispatch(getProduct(keyword, currentpage, price, category,ratings));
  }, [dispatch, error, alert, keyword, currentpage, price, category,ratings]);

  return (
    <>
      {loading ? (<Loader />) : (
        <>
        <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>
          <div className="flex flex-wrap justify-center mx-auto my-8 w-[80vw] max-w-full">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
   {/*  we can also show filters only when the keyword exist */}
          <div className="absolute top-[10vmax] left-[4vmax] w-[10vmax] p-0">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />
          </div>

          <Typography className="mt-8 text-lg">Categories</Typography>
          <ul className="categoryBox space-y-[0.4vmax] mt-4">
            {categories.map((cat) => (
              <li
                className="category-link list-none text-[rgba(0,0,0,0.61)] text-[0.8vmax] font-roboto font-normal m-[0.4vmax] cursor-pointer transition-all duration-500 hover:text-tomato"
                key={cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>

          <fieldset className='w-[10vmax]'>
              <Typography component="legend">Ratings Above</Typography>
              <Slider 
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

          {resultperpage < count && (
            <div className='items-center justify-center mb-10 flex'>
              <Paginationbox
                activePage={currentpage}
                itemsCountPerPage={resultperpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
