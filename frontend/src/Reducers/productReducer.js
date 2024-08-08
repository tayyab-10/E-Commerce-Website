import { ALL_PRODUCT_FAIL,
     ALL_PRODUCT_REQUEST, 
     ALL_PRODUCT_SUCCESS,
      CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESS} from "../Constants/ProductConstant";

const initialState = {
    products: []
  };

//GetAll  product reducer
export const Productreducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case ALL_PRODUCT_SUCCESS:            
            return {
                loading: false,
                products: action.payload.product,       //makeinsure what is getting in the response you should send that in the payload
                productsCount: action.payload.productCount,
            };

            case ALL_PRODUCT_FAIL:
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

//ProductDetails Reducer

export const ProductDetailreducer = (state = {products:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case PRODUCT_DETAILS_SUCCESS:            
            return {
                loading: false,
                products: action.payload.product      //makeinsure what is getting in the response you should send that in the payload
            };

            case PRODUCT_DETAILS_FAIL:
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
