import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector(
    (state) => state.forgotpassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="w-screen h-screen flex justify-center items-center bg-gray-200 fixed top-0 left-0">
            <div className="bg-white w-full max-w-md h-auto p-8 shadow-lg rounded-lg">
              <h2 className="text-center text-gray-700 text-xl font-semibold mb-4 border-b pb-2 border-gray-300">
                Update Password
              </h2>

              <form
                className="flex flex-col items-center space-y-4"
                onSubmit={resetPasswordSubmit}
              >
                <div className="relative w-full flex items-center">
                  <Lock className="absolute left-3 text-gray-500 text-lg" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="relative w-full flex items-center">
                  <Lock className="absolute left-3 text-gray-500 text-lg" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
