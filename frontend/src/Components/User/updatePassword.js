import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateUserPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstants";
import { LockOpenOutlined, VpnKey } from "@mui/icons-material";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
 

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();

    const passwordData = {
      oldPassword,
      newPassword,
      confirmPassword
    };

    dispatch(updateUserPassword(passwordData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="w-screen h-screen flex justify-center items-center bg-gray-200 fixed top-0 left-0">
            <div className="bg-white w-1/4 h-3/4 p-8 shadow-lg">
              <h2 className="text-center text-gray-700 font-semibold text-lg mb-6 border-b pb-2">
                Update Password
              </h2>
              <form
                className="flex flex-col items-center space-y-6"
                onSubmit={updatePasswordSubmit}
              >
                <div className="relative w-full">
                  <VpnKey className="absolute left-3 top-3 text-xl text-gray-500" />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="relative w-full">
                  <LockOpenOutlined className="absolute left-3 top-3 text-xl text-gray-500" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="relative w-full">
                  <LockOpenOutlined className="absolute left-3 top-3 text-xl text-gray-500" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
