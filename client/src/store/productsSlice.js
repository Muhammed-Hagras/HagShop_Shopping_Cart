import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL, setHeaders } from "./api"
import { toast } from "react-toastify"

const initialState= { products: [], status: null, isLoading: false, error: null }

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) =>{
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`${baseURL}/products`);
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


export const CreateProducts = createAsyncThunk(
    "products/CreateProducts",
    async (product) => {
      try {
        const res = await axios.post(
          `${baseURL}/products`,
          product,
          setHeaders()
        );
  
        return res.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state,action) => {
            state.status = "pending";
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state,action) => {
            state.status = "success";
            state.isLoading = false; 
            state.products = action.payload;
        },
        [getProducts.rejected]: (state,action) => {
            state.status = "rejected";
            state.isLoading = false;
            state.error = action.payload

        },
        //Create Products
        [CreateProducts.pending]: (state, action) => {
            state.status = "pending";
          },
          [CreateProducts.fulfilled]: (state, action) => {
            state.products.push(action.payload);
            state.status = "success";
            toast.success("Product Created successfully!");
          },
          [CreateProducts.rejected]: (state, action) => {
            state.status = "rejected";
          },
    }
})

// export const { getProducts } = productsSlice.actions

export default productsSlice.reducer;