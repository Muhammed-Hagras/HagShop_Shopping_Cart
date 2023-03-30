import { configureStore } from "@reduxjs/toolkit";
import productsReducres from "./productsSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer:{
        productsReducres,
        cartReducer,
        authReducer,
    },
})

export default store;