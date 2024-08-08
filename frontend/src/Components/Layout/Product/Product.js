import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = ({ product }) => {  // Destructure product from props
  const { _id, name, images, ratings, numOfReviews, price } = product;  // Destructure the product properties

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: ratings,
    isHalf: true,
  };

  return (
    <Link
      className="w-[14vmax] flex flex-col text-[#303030] m-[2vmax] transition-all duration-500 pb-[0.5vmax] hover:shadow-[0_0_5px_rgba(15,15,15,0.26)] hover:transform hover:-translate-y-[1vmax] no-underline"
      to={`/product/${_id}`}
    >
      <img src={images[0].url} alt={name} className="w-[14vmax]" />
      <p className="font-roboto text-[1.2vmax] my-[1vmax_0.5vmax_0]">{name}</p>
      <div className="flex justify-start items-center m-[0.5vmax]">
        <ReactStars {...options} /> <span className="m-[0.5vmax] font-light text-[0.7vmax] font-roboto">({numOfReviews} Reviews)</span>
      </div>
      <span className="m-[0.5vmax] text-[tomato] font-medium text-[1vmax] font-['Franklin_Gothic_Medium']">{`${price}`}</span>
    </Link>
  );
};

export default Product;
