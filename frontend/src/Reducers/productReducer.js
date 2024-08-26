import { ALL_PRODUCT_FAIL,
     ALL_PRODUCT_REQUEST, 
     ALL_PRODUCT_SUCCESS,
      CLEAR_ERRORS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESS} from "../Constants/ProductConstant";

const initialState = {
    product: null,  // Initialize as null to handle non-existent data cases
    loading: false,
    error: null,
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
                resultperpage:action.payload.resultperpage,
                filteredProductsCount:action.payload.filteredProductsCount
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

export const ProductDetailreducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case PRODUCT_DETAILS_SUCCESS:            
            return {
                loading: false,
                product: action.payload.product      //makeinsure what is getting in the response you should send that in the payload
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


export const addReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };

        case NEW_REVIEW_SUCCESS:            
            return {
                loading: false,
                success: action.payload      //makeinsure what is getting in the response you should send that in the payload
            };

            case NEW_REVIEW_FAIL:
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
