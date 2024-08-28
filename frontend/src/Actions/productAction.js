import axiosInstance from '../AxiosInstance';
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../Constants/ProductConstant';

export const getProduct = (keyword = '',currentpage=1,price=[0,25000],category,ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
  
    let link=`/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    if(category){
      link=`/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
    const { data } = await axiosInstance.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    
    const { data } = await axiosInstance.get(`/product/${id}`);

    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
   
   
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
      payload: error.response.data.message,
    });
  }
};

export const AddReview = (reviewdata) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosInstance.post("/review",reviewdata,config);

    
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data
    });
   
   
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const config={
      withCredentials:true,
    }
    const { data } = await axiosInstance.get("/getallproducts",config);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axiosInstance.get(`/getAllReviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
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