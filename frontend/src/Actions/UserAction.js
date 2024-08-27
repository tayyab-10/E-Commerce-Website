import axios from "axios";
import {ALL_USERS_REQUEST, CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS} from "../Constants/userConstants"

// Login
export const LoginUser = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" },withCredentials: true,};
  
      const { data } = await axios.post(
        `http://localhost:4000/api/auth/login`,
        { email, password },
        config        
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });   //becasue there is a token in the response
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  export const SignupUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" },withCredentials: true };

        const { data } = await axios.post(
            `http://localhost:4000/api/auth/register`,
            formData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({ 
            type: REGISTER_USER_FAIL, 
            payload: error.response.data.message 
        });
    }
};

//load User 
export const LoadUser=()=>async(dispatch) =>{
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = { withCredentials: true };   // if you are not getting token in the response
    const { data } = await axios.get(`http://localhost:4000/api/auth/mydetail`,config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });   //becasue there is a token in the response
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
}


//Logout User 
export const LogoutUser=()=>async(dispatch) =>{
  try {
         await axios.get(`http://localhost:4000/api/auth/logout`,{ withCredentials: true });

    dispatch({ type: LOGOUT_SUCCESS });   //becasue there is a token in the response
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
}
  

//Update Profile Action 
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" },withCredentials: true,};

    const { data } = await axios.put(
      `http://localhost:4000/api/auth/updateProfile`,
      userData ,
      config        
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });   //becasue there is a token in the response
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
  }
};

//Update Password
export const updateUserPassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { 
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/auth/password/updatePassword`,
      passwordData,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`http://localhost:4000/api/auth/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:4000/api/auth/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};


 //Clearing Errors
 export const clearError=()=>async(dispatch)=>{
    dispatch({
      type:CLEAR_ERRORS
    })
   }