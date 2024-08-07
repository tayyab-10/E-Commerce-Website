import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from "../Constants/ProductConstant"



export const Productreducer=(state={products:[]}, action)=>{

    switch (action.type) {
        case ALL_PRODUCT_FAIL:
            return{
                loading:false,
                product:action.payload,
            }
        case ALL_PRODUCT_REQUEST:
            return{
               loading:true,
                product:[],
            }
        case ALL_PRODUCT_SUCCESS:
            return{
               loading:false,
               product:action.payload.products,
               productsCount:action.payload.productsCount,
            }

        case CLEAR_ERRORS:
                return{
                   ...state,
                    error:null
                }
        
        default:
               return state;
    }
}