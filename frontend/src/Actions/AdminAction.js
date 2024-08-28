import axios from "axios";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAIL,CLEAR_ERRORS} from "../Constants/userConstants";
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../Constants/ProductConstant";

export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
  
      const config = {
        withCredentials: true,
      };
  
      const { data } = await axios.get("http://localhost:4000/api/auth/admin/getUsers", config);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : error.message || "Something went wrong";
  
      dispatch({ type: ALL_USERS_FAIL, payload: errorMessage });
    }
  };
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const config={
          withCredentials:true
      }
      const { data } = await axios.get(`http://localhost:4000/api/auth/admin/getuser/${id}`,config);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" }, withCredentials:true};
  
      const { data } = await axios.put(
        `http://localhost:4000/api/auth/admin/updateUser/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const config={
        withCredentials:true
      }
      const { data } = await axios.delete(`http://localhost:4000/api/auth/admin/deleteUser/${id}`,config);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Add new Product 
  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials:true
      };
  
      const { data } = await axios.post(
        "http://localhost:4000/api/product/createProduct",
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Product
  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials:true
      };
  
      const { data } = await axios.put(
        `http://localhost:4000/api/product/updateproduct/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Product
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
       const config={
        withCredentials:true
       }
      const { data } = await axios.delete(`http://localhost:4000/api/product/deleteproduct/${id}`,config);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
   //Clearing Errors
   export const clearErrors=()=>async(dispatch)=>{
      dispatch({
        type:CLEAR_ERRORS
      })
     }