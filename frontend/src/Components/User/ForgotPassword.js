import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { MailOutlineOutlined } from "@mui/icons-material";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  

  const { error, message, loading } = useSelector(
    (state) => state.forgotpassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="w-screen h-screen flex justify-center items-center bg-gray-200 fixed top-0 left-0">
            <div className="bg-white w-full max-w-xs h-auto p-8 shadow-lg rounded-lg">
              <h2 className="text-center text-gray-700 text-xl font-semibold mb-4 border-b pb-2 border-gray-300">
                Forgot Password
              </h2>

              <form
                className="flex flex-col items-center space-y-4"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="relative w-full flex items-center">
                  <MailOutlineOutlined className="absolute left-3 text-gray-500 text-lg" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
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

export default ForgotPassword;
