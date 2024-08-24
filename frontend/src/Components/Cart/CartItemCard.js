import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="flex p-[1vmax] h-[8vmax] items-start box-border mb-5">
      <img src={item.image} alt="product" className="w-[5vmax]" />
      <div className="flex flex-col m-[0.3vmax_1vmax]">
        <Link
          to={`/product/${item.product}`}
          className="font-cursive text-[1.3vmax] mb-1 text-[rgba(24,24,24,0.815)] no-underline"
        >
          {item.name}
        </Link>
        <span className="font-roboto text-[1vmax] mb-1 text-[rgba(24,24,24,0.815)]">
          {`Price: $ ${item.price}`}
        </span>
        <p
          className="text-red-500 font-100 text-[1vmax] cursor-pointer"
          onClick={() => deleteCartItems(item.product)}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
