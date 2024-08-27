import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = (isAdmin,{...rest }) => {
  const { loading, isAuthenticated ,user} = useSelector((state) => state.User);

  if (loading) return <Loader/>; 

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
