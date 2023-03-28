import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []}
const cartSlice =createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.cartItems[existingIndex].quantity +=1;
                toast.info(`Increaed ${state.cartItems[existingIndex].name} product quantity`,{
                    position: "bottom-left",
                });
            } else {
                let myNewProduct = {...action.payload, quantity:1};
                state.cartItems.push(myNewProduct);
                toast.success(` ${action.payload.name} added to cart`,{
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;