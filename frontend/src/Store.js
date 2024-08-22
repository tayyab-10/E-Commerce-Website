import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";

import {thunk} from 'redux-thunk'; 

import { composeWithDevTools } from "redux-devtools-extension";

import { ProductDetailreducer, Productreducer } from "./Reducers/productReducer";
import { userReducer } from "./Reducers/UserReducer";

const reducer = combineReducers({
    products: Productreducer,
    productDetails:ProductDetailreducer,
    User:userReducer
});

let initialState = {};

const middleware = [thunk]; 

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
