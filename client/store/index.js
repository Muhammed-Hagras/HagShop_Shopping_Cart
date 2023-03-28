import { configureStore } from "@reduxjs/toolkit";
import productsReducres from "./productsSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer:{
        productsReducres,
        cartReducer
    },
})

export default store;