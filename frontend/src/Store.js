import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addReviewReducer, deletereviewReducer, ProductDetailreducer, Productreducer, productReviewsReducer } from "./Reducers/productReducer";
import { forgotPasswordReducer, ProfileReducer, userReducer } from "./Reducers/UserReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {myOrdersReducer, newOrderReducer, orderDetailsReducer,orderReducer} from "./Reducers/orderReducer";
import { AdminProductreducer, allOrdersReducer, allUsersReducer, newProductReducer, productReducer, userDetailsReducer, UserprofileReducer } from "./Reducers/AdminReducers";

const reducer = combineReducers({
    products: Productreducer,
    productDetails: ProductDetailreducer,
    User: userReducer,
    profile: ProfileReducer,
    forgotpassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myorders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    addReview:addReviewReducer,
    allOrders:allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    adminproduct:AdminProductreducer,
    createProduct:newProductReducer,
    updatedeleteproduct:productReducer,
    UserProfile:UserprofileReducer,
    UserDetails:userDetailsReducer,
    GetReviews:productReviewsReducer,
    deleteReviews:deletereviewReducer
});

// Safe parsing function
function safeJsonParse(item) {   // if your cart is empty then it will be undefined and the JSON could not parse undefined
    try {
        return JSON.parse(item);
    } catch (e) {
        return [];
    }
}

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? safeJsonParse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo:{
                shippingInfo: localStorage.getItem("shippingInfo")
                ? safeJsonParse(localStorage.getItem("shippingInfo"))
                : []
            }
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
