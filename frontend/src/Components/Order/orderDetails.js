import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../Actions/OrderAction";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="bg-white">
            <div className="p-[5vmax] pb-0">
              <Typography
                component="h1"
                className="font-light text-[3vmax] my-[4vmax] text-tomato"
              >
                Order #{order && order._id}
              </Typography>
              <Typography className="font-normal text-[1.8vmax]">
                Shipping Info
              </Typography>
              <div className="m-[2vmax]">
                <div className="flex my-[1vmax]">
                  <p className="font-normal text-[1vmax] text-black">Name:</p>
                  <span className="ml-[1vmax] font-thin text-[1vmax] text-[#575757]">
                    {order.user && order.user.name}
                  </span>
                </div>
                <div className="flex my-[1vmax]">
                  <p className="font-normal text-[1vmax] text-black">Phone:</p>
                  <span className="ml-[1vmax] font-thin text-[1vmax] text-[#575757]">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex my-[1vmax]">
                  <p className="font-normal text-[1vmax] text-black">Address:</p>
                  <span className="ml-[1vmax] font-thin text-[1vmax] text-[#575757]">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography className="font-normal text-[1.8vmax]">
                Payment
              </Typography>
              <div className="m-[2vmax]">
                <div className="flex my-[1vmax]">
                  <p
                    className={`font-normal text-[1vmax] ${
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div className="flex my-[1vmax]">
                  <p className="font-normal text-[1vmax] text-black">Amount:</p>
                  <span className="ml-[1vmax] font-thin text-[1vmax] text-[#575757]">
                    {order.totalPrice && order.totalPrice}
                  </span>
                </div>
              </div>

              <Typography className="font-normal text-[1.8vmax]">
                Order Status
              </Typography>
              <div className="m-[2vmax]">
                <div className="flex my-[1vmax]">
                  <p
                    className={`font-normal text-[1vmax] ${
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-black/25 p-[2vmax] pb-0">
              <Typography className="font-normal text-[1.8vmax]">
                Order Items:
              </Typography>
              <div className="m-[2vmax]">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center font-normal text-[1vmax] my-[2vmax]"
                    >
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-[3vmax]"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-[#575757] mx-[2vmax] w-[60%] no-underline"
                      >
                        {item.name}
                      </Link>
                      <span className="font-thin text-[#5e5e5e]">
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
