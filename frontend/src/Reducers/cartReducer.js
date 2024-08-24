import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
  } from "../Constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} }, // Initial state with cartItems as an empty array
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
      
        // Safely check if cartItems is an array
        const isItemExist = state.cartItems?.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
  