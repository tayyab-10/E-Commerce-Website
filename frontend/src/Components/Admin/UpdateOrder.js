import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../Actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../Constants/OrderConstants";

const UpdateOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, isUpdated, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] flex-grow w-full">
          <SideBar />
          <>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="w-full max-w-4xl space-y-6">
                  {/* Shipping Info and Payment Details Form */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <Typography className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                      Shipping Info
                    </Typography>
                    <div className="orderDetailsContainerBox space-y-4">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Phone:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                    <Typography className="text-2xl font-semibold text-gray-700 mb-6 text-center mt-8">
                      Payment
                    </Typography>
                    <div className="orderDetailsContainerBox space-y-4">
                      <div className="flex justify-between">
                        <p
                          className={`font-medium text-gray-600 ${
                            order.paymentInfo && order.paymentInfo.status === "succeeded"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.paymentInfo && order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>
                    <Typography className="text-2xl font-semibold text-gray-700 mb-6 text-center mt-8">
                      Order Status
                    </Typography>
                    <div className="orderDetailsContainerBox space-y-4">
                      <div className="flex justify-between">
                        <p
                          className={`font-medium text-gray-600 ${
                            order.orderStatus === "Delivered"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <Typography className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                      Your Cart Items
                    </Typography>
                    <div className="space-y-4">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex items-center space-x-4"
                          >
                            <img
                              src={item.image}
                              alt="Product"
                              className="w-12 h-12 object-cover rounded"
                            />
                            <Link to={`/product/${item.product}`} className="font-medium text-gray-600">
                              {item.name}
                            </Link>
                            <span className="font-medium text-gray-600">
                              {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Process Order Form */}
                {order.orderStatus !== "Delivered" && (
                  <form
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex items-center space-x-4"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <AccountTreeIcon className="text-gray-500" />
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                    >
                      <option value="">Choose Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    <Button
                      type="submit"
                      disabled={loading || status === ""}
                      className="w-full bg-tomato text-white py-2 rounded hover:bg-red-600 transition-all"
                    >
                      Process
                    </Button>
                  </form>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
