import { configureStore } from "@reduxjs/toolkit";
import productsReducres from "./productsSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import OrdersReducer from "./orderSlice";

const store = configureStore({
    reducer:{
        productsReducres,
        cartReducer,
        authReducer,
        OrdersReducer,
    },
})

export default store;