import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="m-auto text-center p-[10vmax] h-[50vh] flex flex-col justify-center items-center">
      <CheckCircleIcon className="text-[10vmax] text-[tomato]" />

      <Typography className="text-[2vmax]">
        Your Order has been Placed successfully
      </Typography>
      <Link
        to="/orders"
        className="bg-[#333] text-white border-none p-[1vmax_3vmax] cursor-pointer font-['Roboto'] font-[400] text-[1vmax] no-underline my-[2vmax]"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
