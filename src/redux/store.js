// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import productReducer from "./slices/product/Product.slice";
import cartReducer from "./slices/cart/Cart.slice";
import productDetailsReducer from "./slices/product-details/ProductDetails.slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
