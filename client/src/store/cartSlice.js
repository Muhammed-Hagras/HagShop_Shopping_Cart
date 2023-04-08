import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += 1;
        toast.info(
          `${state.cartItems[existingIndex].name} areadly exist and increaed  product quantity`,
          {
            position: "bottom-left",
          }
        );
      } else {
        let myNewProduct = { ...action.payload, quantity: 1 };
        state.cartTotalQuantity +=1;     // increment total quantity => solve problem of not increasing nav-cart at home page
        state.cartItems.push(myNewProduct);
        toast.success(` ${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

          toast.error(` ${action.payload.name} removed from cart`, {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.info(
          `Decreased ${state.cartItems[itemIndex].name} product quantity`,
          {
            position: "bottom-left",
          }
        );
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error(` ${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error(`Cart Cleared` ,{
        position: "bottom-left",
      })
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let { myTotal, myQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity; //total value price of one item in cart 

          cartTotal.myTotal += itemTotal;//total value price of all item in cart  
          cartTotal.myQuantity += quantity; //total quantinity
          // console.log({cartTotal})
          return cartTotal;
        }, {
          myTotal: 0,
          myQuantity: 0
        },
      );
      state.cartTotalQuantity = myQuantity;
      state.cartTotalAmount = myTotal;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
