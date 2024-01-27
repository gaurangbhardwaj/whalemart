// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import productDetailsReducer from "./slices/productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});

export default store;
