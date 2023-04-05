import { configureStore } from "@reduxjs/toolkit";
import productsReducres from "./productsSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import OrdersReducer from "./orderSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
    reducer:{
        productsReducres,
        cartReducer,
        authReducer,
        OrdersReducer,
        usersReducer,
    },
})

export default store;