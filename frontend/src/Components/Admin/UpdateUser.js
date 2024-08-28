import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../Constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../Actions/AdminAction";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.UserDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.UserProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    updateError,
    user,
    userId,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_5fr] flex-grow w-full">
          <SideBar />
          <>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex items-center justify-center">
                <form
                  className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                  onSubmit={updateUserSubmitHandler}
                >
                  <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Update User
                  </h1>

                  <div className="mb-4 relative">
                    <PersonIcon className="absolute left-3 top-2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                  </div>

                  <div className="mb-4 relative">
                    <MailOutlineIcon className="absolute left-3 top-2 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                  </div>

                  <div className="mb-4 relative">
                    <VerifiedUserIcon className="absolute left-3 top-2 text-gray-500" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none"
                    >
                      <option value="">Choose Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={updateLoading || role === "" ? true : false}
                    className="w-full bg-tomato text-white py-2 rounded hover:bg-red-600 transition-all"
                  >
                    Update
                  </Button>
                </form>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
