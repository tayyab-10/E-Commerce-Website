import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment/process");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="min-h-screen bg-white grid grid-cols-6 md:grid-cols-3">
        <div className="col-span-4 md:col-span-2 p-[5vmax] pb-0">
          <div className="pb-5">
            <Typography className="text-2xl font-medium">Shipping Info</Typography>
            <div className="mt-[2vmax]">
              <div className="flex my-[1vmax]">
                <p className="text-base font-normal">Name:</p>
                <span className="ml-[1vmax] text-base text-gray-600">{user.name}</span>
              </div>
              <div className="flex my-[1vmax]">
                <p className="text-base font-normal">Phone:</p>
                <span className="ml-[1vmax] text-base text-gray-600">{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex my-[1vmax]">
                <p className="text-base font-normal">Address:</p>
                <span className="ml-[1vmax] text-base text-gray-600">{address}</span>
              </div>
            </div>
          </div>
          <div className="py-[2vmax]">
            <Typography className="text-2xl font-medium">Your Cart Items:</Typography>
            <div className="max-h-[20vmax] overflow-y-auto mt-[2vmax]">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between my-[2vmax]">
                    <img src={item.image} alt="Product" className="w-[3vmax]" />
                    <Link
                      to={`/product/${item.product}`}
                      className="mx-[2vmax] w-[60%] text-gray-600"
                    >
                      {item.name}
                    </Link>
                    <span className="text-base text-gray-500">
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="border-l border-gray-300 p-[7vmax]">
          <Typography className="text-2xl font-medium text-center border-b pb-[1vmax] mb-[2vmax]">
            Order Summary
          </Typography>
          <div className="space-y-[2vmax]">
            <div className="flex justify-between text-base font-light">
              <p>Subtotal:</p>
              <span className="text-gray-700">${subtotal}</span>
            </div>
            <div className="flex justify-between text-base font-light">
              <p>Shipping Charges:</p>
              <span className="text-gray-700">${shippingCharges}</span>
            </div>
            <div className="flex justify-between text-base font-light">
              <p>GST:</p>
              <span className="text-gray-700">${tax}</span>
            </div>
          </div>
          <div className="flex justify-between text-base font-light border-t border-gray-400 py-[2vmax]">
            <p className="font-bold">Total:</p>
            <span className="font-bold">${totalPrice}</span>
          </div>
          <button
            onClick={proceedToPayment}
            className="w-full bg-red-500 text-white py-[1vmax] mt-[2vmax] hover:bg-red-600 transition duration-500"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
