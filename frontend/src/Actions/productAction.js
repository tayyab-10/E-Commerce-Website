import axiosInstance from '../AxiosInstance';
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../Constants/ProductConstant';

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
  
    const { data } = await axiosInstance.get('/products');
    
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
  
    const { data } = await axiosInstance.get(`/products/${id}`);
    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
