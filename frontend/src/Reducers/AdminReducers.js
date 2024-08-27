import { ALL_USERS_REQUEST,ALL_USERS_SUCCESS,ALL_USERS_FAIL,CLEAR_ERRORS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL} from "../Constants/userConstants";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS } from "../Constants/OrderConstants";
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../Constants/ProductConstant";


export const AdminProductreducer = (state = {}, action) => {
    switch (action.type) {
            case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload
            }
           
        case ADMIN_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const allUsersReducer = (state = { }, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload.users,
        };
  
      case ALL_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  

  export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case NEW_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product,
        };
      case NEW_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_PRODUCT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


  export const productReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };