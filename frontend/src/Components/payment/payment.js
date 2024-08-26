import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder } from "../../Actions/OrderAction";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../Actions/OrderAction";

const Payment = () => { 
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.User);
  const { error } = useSelector((state) => state.newOrder);
   
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
  
      const response = await axios.post(
        "http://localhost:4000/api/payment/process",
        paymentData,
        config
      );
  
  
      const client_secret = response.data.client_secret;
  
      if (!stripe || !elements) {
        console.log("Stripe or elements is missing.");
        return;
      }
  
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
  
  
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
           order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
           }
           dispatch(createOrder(order))
           navigate("/success");

      } else {
        alert.error("There's some issue while processing payment");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response?.data?.message);
    }
  };
  
  

  useEffect(() => {
    if(error){
      alert.error(error.message)
      dispatch(clearErrors())
    }
  }, [dispatch, alert,error]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex justify-center items-center bg-white h-[70vh] my-4 p-4">
        <form
          className="w-full max-w-sm p-4 border rounded shadow-md flex flex-col space-y-4"
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography className="text-center text-lg font-medium mb-2 border-b border-gray-300 pb-2">Card Info</Typography>
          <div className="relative flex items-center">
            <CreditCardIcon className="absolute  text-gray-500 text-lg transform translate-x-3" />
            <CardNumberElement className="w-full px-4 py-2 border border-gray-400 rounded" />
          </div>
          <div className="relative flex items-center">
            <EventIcon className="absolute text-gray-500 text-lg transform translate-x-3" />
            <CardExpiryElement className="w-full px-4 py-2 border border-gray-400 rounded" />
          </div>
          <div className="relative flex items-center">
            <VpnKeyIcon className="absolute text-gray-500 text-lg transform translate-x-3" />
            <CardCvcElement className="w-full px-4 py-2 border border-gray-400 rounded" />
          </div>

          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="bg-red-500 text-white font-medium text-base w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-red-600"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
