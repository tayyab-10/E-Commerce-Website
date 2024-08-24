import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="m-auto text-center p-[10vmax] h-[50vh] flex flex-col justify-center items-center">
          <RemoveShoppingCart className="text-[3vmax] text-red-500"  />
          <Typography style={{fontSize:"24px"}}>No Product in Your Cart</Typography>
          <Link
            to="/products"
            className="bg-gray-800 text-white border-none p-[1vmax] px-[3vmax] cursor-pointer font-roboto text-[1vmax] no-underline mt-2"
          >
            View Products
          </Link>
        </div>
      ) : (
        <>
          <div className="p-[5vmax]">
            <div className="bg-red-500 w-[90%] box-border m-auto mb-6 text-white grid grid-cols-[4fr_1fr_1fr] font-roboto text-[1vmax]">
              <p className="m-[10px]">Product</p>
              <p className="m-[10px]">Quantity</p>
              <p className="m-[10px] text-right">Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div
                  className="w-[90%] m-auto grid grid-cols-[4fr_1fr_1fr]"
                  key={item.product}
                >
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="flex items-center h-[8vmax]">
                    <button
                      className="border-none bg-black/60 p-[0.5vmax] cursor-pointer text-white transition-all duration-500 hover:bg-black/80"
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="border-none p-[0.5vmax] w-[4vmax] text-center outline-none font-roboto text-[0.8vmax] text-black/75"
                    />
                    <button
                      className="border-none bg-black/60 p-[0.5vmax] cursor-pointer text-white transition-all duration-500 hover:bg-black/80"
                      onClick={() =>
                        increaseQuantity(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="flex p-[0.5vmax] h-[8vmax] items-center box-border font-cursive text-[1vmax] text-black/75 justify-end">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}

            <div className="grid grid-cols-[2fr_1.2fr]">
              <div></div>
              <div className="border-t-[3px] border-t-tomato m-[1vmax_4vmax] box-border p-[2vmax_0] font-roboto text-[1vmax] flex justify-between">
                <p>Gross Total</p>
                <p>{`$${cartItems.reduce(  //The reduce method in JavaScript is used to process an array and accumulate a single result.
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white border-none p-[0.8vmax] px-[4vmax] w-[50%] font-roboto text-[1.1vmax] m-[1vmax_4vmax] cursor-pointer rounded-[30px] transition-all duration-500 outline-none hover:bg-[rgb(185,64,42)] hover:scale-110"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
