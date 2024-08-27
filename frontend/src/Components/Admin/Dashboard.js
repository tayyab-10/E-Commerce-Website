import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../Actions/productAction.js";
import { getAllOrders } from "../../Actions/OrderAction.js";
import { getAllUsers } from "../../Actions/AdminAction.js";
import MetaData from "../Layout/MetaData.js";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.adminproduct);
  const { orders = [] } = useSelector((state) => state.allOrders || {});
  const { users = [] } = useSelector((state) => state.allUsers || {});

  console.log("The Users data are",users);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],  //temp needs to change but some error here 
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] w-screen max-w-full absolute">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="bg-white border-l md:border-l-[1px] border-gray-200 py-12">
       
          <h1 className="text-[rgba(0,0,0,0.733)] font-light text-2xl md:text-[2rem] text-center w-1/2 p-2 mx-auto font-roboto">
          Dashboard
          </h1>
       

        <div className="my-8">
          <div className="flex justify-center bg-white">
            <p className="bg-[rgba(70,117,218,0.932)] text-white font-light text-[1.3rem] text-center p-6 w-full mx-8 md:mx-2">
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/admin/products"
            className="text-white font-light text-2xl md:text-[2rem] text-center bg-yellow-400 no-underline p-6 w-[10vmax] h-[10vmax] m-8 md:m-2 rounded-full flex justify-center items-center flex-col"
          >
            Product
            <br />
            {products && products.length}
          </Link>
          <Link
            to="/admin/orders"
            className="bg-[rgb(255,233,174)] text-black font-light text-2xl md:text-[2rem] text-center no-underline p-6 w-[10vmax] h-[10vmax] m-8 md:m-2 rounded-full flex justify-center items-center flex-col"
          >
            Orders
            <br />
            {orders && orders.length}
          </Link>
          <Link
            to="/admin/users"
            className="text-white font-light text-2xl md:text-[2rem] text-center bg-yellow-400 no-underline p-6 w-[10vmax] h-[10vmax] m-8 md:m-2 rounded-full flex justify-center items-center flex-col"
          >
            Users
            <br />
            {users && users.length}
          </Link>
        </div>

        <div className="w-4/5 mx-auto">
          <Line data={lineState} />
        </div>

        <div className="w-[30vmax] mx-auto">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
