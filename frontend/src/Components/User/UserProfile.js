import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.User);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated,navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="flex h-screen w-screen fixed top-0 left-0 max-w-full bg-white">
            <div className="flex h-full w-full max-w-full flex-col justify-center items-center">
              <h1 className="text-gray-700 font-medium text-[2.2vmax] mt-[2vmax] ml-0">
                My Profile
              </h1>
              <img
                src={user.avatar.url}
                alt={user.name}
                className="w-[20vmax] h-[20vmax] rounded-full object-cover transition-transform duration-500 hover:scale-105 mt-[2vmax]"
              />
              <Link
                to="/updateProfile"
                className="border-none bg-red-500 font-normal text-[1vmax] text-white no-underline p-[0.5vmax] w-[30%] my-[4vmax] text-center transition-all duration-500 hover:bg-[rgb(204,78,56)]"
              >
                Edit Profile
              </Link>
            </div>
            <div className="flex h-full w-full max-w-full flex-col justify-evenly items-start p-[5vmax] box-border">
              <div>
                <h4 className="text-black font-normal text-[1.2vmax]">
                  Full Name
                </h4>
                <p className="text-[rgba(0,0,0,0.418)] font-normal text-[1vmax] cursive my-[0.2vmax]">
                  {user.name}
                </p>
              </div>
              <div>
                <h4 className="text-black font-normal text-[1.2vmax]">Email</h4>
                <p className="text-[rgba(0,0,0,0.418)] font-normal text-[1vmax] cursive my-[0.2vmax]">
                  {user.email}
                </p>
              </div>
              <div>
                <h4 className="text-black font-normal text-[1.2vmax]">
                  Joined On
                </h4>
                <p className="text-[rgba(0,0,0,0.418)] font-normal text-[1vmax] cursive my-[0.2vmax]">
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>

              <div className="flex flex-col w-[60%]">
                <Link
                  to="/orders"
                  className="border-none bg-[rgb(68,68,68)] font-normal text-[1vmax] text-white no-underline p-[0.5vmax] text-center transition-all duration-500 my-[1vmax] hover:bg-[rgb(31,31,31)]"
                >
                  My Orders
                </Link>
                <Link
                  to="/password/update"
                  className="border-none bg-[rgb(68,68,68)] font-normal text-[1vmax] text-white no-underline p-[0.5vmax] text-center transition-all duration-500 my-[1vmax] hover:bg-[rgb(31,31,31)]"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
