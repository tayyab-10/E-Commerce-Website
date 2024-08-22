import axios from "axios";
import {CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS} from "../Constants/userConstants"

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
  
 //Clearing Errors
 export const clearError=()=>async(dispatch)=>{
    dispatch({
      type:CLEAR_ERRORS
    })
   }