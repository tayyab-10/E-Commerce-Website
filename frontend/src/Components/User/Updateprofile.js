import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import { clearError, LoadUser,updateUserProfile } from "../../Actions/UserAction";
import { Face2Outlined, MailLockOutlined } from "@mui/icons-material";
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.User);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);
    dispatch(updateUserProfile(myForm));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        setAvatar(file);

        // For displaying the preview, you can use FileReader
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    } else {
        console.log("No file selected");
    }
};


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(LoadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated,navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Update Profile
              </h2>

              <form
                className="space-y-6"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="flex items-center border-b border-gray-300 py-2">
                  <Face2Outlined className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center border-b border-gray-300 py-2">
                  <MailLockOutlined className="text-gray-500 mr-2" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="ml-4 text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-400 hover:bg-[rgb(204,78,56)] text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
